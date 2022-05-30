import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {CustomText} from '../../../../components/general/CustomText';
import colors from '../../../../constants/colors';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {IconButton} from 'react-native-paper';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
var availableDatesList = [
  '2022-05-31',
  '2022-05-30',
  '2022-06-01',
  '2022-06-02',
  '2022-06-05',
];

const AvailableDates = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [currentDate] = useState(new Date());

  // When the day is pressed, if the day is in availableDatesList, then remove it. if it is not in availableDatesList, then add it.
  const onDayPress = day => {
    if (availableDatesList.includes(day.dateString)) {
      // const index = availableDatesList.indexOf(day.dateString);
      var filtered = availableDatesList.filter(function (value, index, arr) {
        return value !== day.dateString;
      });
      availableDatesList = filtered;
    } else if (!availableDatesList.includes(day.dateString)) {
      availableDatesList.push(day.dateString);
    }
    settingMarkedDates(availableDatesList);
  };

  // convert Date to string
  const dateToString = useCallback((convertDate = new Date()) => {
    let toStringDate =
      convertDate.getFullYear() +
      '-' +
      (convertDate.getMonth() + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      '-' +
      convertDate.getDate().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    return toStringDate;
  }, []);

  // Check if there is a right before or after a specific date
  const checkPreviousAndNextDayExist = useCallback(
    (date, allDaysList) => {
      // The next date
      let tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateToString(tomorrow);
      tomorrow = dateToString(tomorrow);
      // The previous date
      let yesterday = new Date(date);
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday = dateToString(yesterday);

      // The previous day exists in the availableDatesList
      const yesterdayExists = allDaysList.includes(yesterday);

      // The next day exists in the availableDatesList
      const tomorrowExists = allDaysList.includes(tomorrow);

      return {yesterdayExists: yesterdayExists, tomorrowExists: tomorrowExists};
    },
    [dateToString],
  );

  // return available dates in a range from
  const displayAvailableDates = () => {
    var availableDatesSet = new Set(availableDatesList);
    var orderedAvailableDates = Array.from(availableDatesSet).sort();

    // Date range (startingDay and endingDay) list
    const dateRanges = [];

    // Starting Date
    var startingDate = '';

    // Ending Date
    var endingDate = '';

    for (let index = 0; index < orderedAvailableDates.length; index++) {
      // Current date
      const currDate = orderedAvailableDates[index];
      // Check if previous and next day of the current date exists in the list
      const tomorrowAndYesterdayExists = checkPreviousAndNextDayExist(
        currDate,
        orderedAvailableDates,
      );

      if (
        tomorrowAndYesterdayExists.yesterdayExists &&
        tomorrowAndYesterdayExists.tomorrowExists
      ) {
        continue;
      } else if (
        tomorrowAndYesterdayExists.yesterdayExists &&
        !tomorrowAndYesterdayExists.tomorrowExists
      ) {
        endingDate = currDate;
      } else if (
        !tomorrowAndYesterdayExists.yesterdayExists &&
        tomorrowAndYesterdayExists.tomorrowExists
      ) {
        startingDate = currDate;
      } else if (
        !tomorrowAndYesterdayExists.yesterdayExists &&
        !tomorrowAndYesterdayExists.tomorrowExists
      ) {
        startingDate = currDate;
        endingDate = currDate;
      }

      if (startingDate && endingDate) {
        dateRanges.push({startingDate: startingDate, endingDate: endingDate});
        startingDate = '';
        endingDate = '';
      }
    }

    return dateRanges;
  };

  // render available dates range
  const renderAvailableDates = useCallback(({item}) => {
    return (
      <View style={styles.availableDatesRangeItem}>
        {/* If the startingDate and the endingDate  are equal, it means the object contains only a single date (has no next or previous dates)*/}
        {item.startingDate === item.endingDate && (
          <CustomText
            style={styles.availableDatesRangeItemText}
            content={item.startingDate}
          />
        )}
        {/* If the startingDate and the endingDate are not equal, it means the object contains range of dates */}
        {item.startingDate !== item.endingDate && (
          <>
            <CustomText
              style={styles.availableDatesRangeItemText}
              content={item.startingDate}
            />
            <CustomText content={'-'} />
            <CustomText
              style={styles.availableDatesRangeItemText}
              content={item.endingDate}
            />
          </>
        )}
      </View>
    );
  }, []);

  // Set marked dates to the markedDates variable
  const settingMarkedDates = useCallback(
    avDates => {
      const markedDatesObj = {};
      // Sort available dates to check tomorrow and yesterday from a given day exists in the list
      var orderedAvDates = avDates.sort();

      // Loop through the available dates and set them to markedDatesObj and then set them to markedDates
      for (let index = 0; index < orderedAvDates.length; index++) {
        const currDate = orderedAvDates[index];

        const tomorrowAndYesterdayExists = checkPreviousAndNextDayExist(
          currDate,
          orderedAvDates,
        );

        // If yesterday doesn't exist and tomorrow exists then set the date startingDay
        if (
          !tomorrowAndYesterdayExists.yesterdayExists &&
          tomorrowAndYesterdayExists.tomorrowExists
        ) {
          markedDatesObj[currDate] = {
            startingDay: true,
            color: colors.primary,
          };
          // If yesterday exists and tomorrow doesn't exist then set the date endingDay
        } else if (
          tomorrowAndYesterdayExists.yesterdayExists &&
          !tomorrowAndYesterdayExists.tomorrowExists
        ) {
          markedDatesObj[currDate] = {
            endingDay: true,
            color: colors.primary,
          };
          // If both exist then just make the date color primary
        } else if (
          tomorrowAndYesterdayExists.yesterdayExists &&
          tomorrowAndYesterdayExists.tomorrowExists
        ) {
          markedDatesObj[currDate] = {
            color: colors.primary,
          };
          // If both don't exist then set the date both startingDay and endingDay
        } else if (
          !tomorrowAndYesterdayExists.yesterdayExists &&
          !tomorrowAndYesterdayExists.tomorrowExists
        ) {
          markedDatesObj[currDate] = {
            startingDay: true,
            endingDay: true,
            color: colors.primary,
          };
        }
      }
      setMarkedDates(markedDatesObj);
    },
    [checkPreviousAndNextDayExist],
  );

  useEffect(() => {
    settingMarkedDates(availableDatesList);
  }, [settingMarkedDates]);

  return (
    <View style={styles.container}>
      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          markingType={'period'}
          minDate={dateToString()}
          hideExtraDays={true}
          disableAllTouchEventsForDisabledDays={true}
          onDayPress={onDayPress}
          markedDates={{
            [dateToString()]: {
              marked: true,
              disableTouchEvent: false,
              dotColor: colors.green,
            },
            ...markedDates,
          }}
          onVisibleMonthsChange={months => {
            // console.log('now these months are visible', months);
          }}
        />
      </View>
      <View style={styles.availableDatesDisplay}>
        <CustomText content={'Available Dates'} fontSize={18} />
        <FlatList
          data={displayAvailableDates()}
          renderItem={renderAvailableDates}
          keyExtractor={(item, index) => item.startingDate}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    // justifyContent: 'center',
  },
  addActiveDates: {
    alignItems: 'flex-end',
  },
  calendar: {
    elevation: 1,
    height: 'auto',
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  calendarContainer: {
    paddingTop: 15,
    height: height / 2.1,
  },
  indicatorStyle: {
    backgroundColor: colors.primary,
  },
  availableDatesDisplay: {
    marginTop: 15,
    backgroundColor: colors.white,
    height: height / 2.9,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    elevation: 1,
  },
  availableDatesRangeItem: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: colors.secondary,
  },
});

export default AvailableDates;
