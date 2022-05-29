import {View, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {CustomText} from '../../../../components/general/CustomText';
import colors from '../../../../constants/colors';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {IconButton} from 'react-native-paper';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const AvailableDates = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [currentDate] = useState(new Date());

  const onDayPress = day => {
    setMarkedDates(prevState => ({...prevState}));
    console.log(markedDates);
  };

  const currentDateString = (convertDate = new Date()) => {
    let dateString =
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
    return dateString;
  };

  // Set marked dates
  const settingMarkedDates = () => {
    const markedDatesObj = {};
    var orderedAvDate = availableDates.sort();

    for (let index = 0; index < orderedAvDate.length; index++) {
      const avDate = availableDates[index];
      // The next date
      let tomorrow = new Date(avDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      currentDateString(tomorrow);
      tomorrow = currentDateString(tomorrow);

      // The previous date
      let yesterday = new Date(avDate);
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday = currentDateString(yesterday);

      console.log('tomorrow: ' + tomorrow);
    }
  };

  settingMarkedDates();

  const getMarkedDates = () => {
    var today = new Date('2020-05-29');
    var nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    console.log(nextDay);
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      {/* Calendar Container */}
      <View style={styles.calendarContainer}>
        {/* Add active dates icon */}
        <View style={styles.addActiveDates}>
          <IconButton
            icon={'plus'}
            size={30}
            color={colors.primary}
            onPress={() => {}}
          />
        </View>
        {/* CalendarList */}
        <CalendarList
          style={styles.calendar}
          markingType={'period'}
          minDate={currentDateString()}
          disableAllTouchEventsForInactiveDays={false}
          disableAllTouchEventsForDisabledDays={false}
          // indicatorStyle={styles.indicatorStyle}
          pastScrollRange={0}
          futureScrollRange={5}
          onDayPress={onDayPress}
          showsVerticalScrollIndicator={true}
          markedDates={{
            [currentDateString()]: {
              marked: true,
              dotColor: colors.green,
            },
            ...markedDates,
          }}
          onVisibleMonthsChange={months => {
            // console.log('now these months are visible', months);
          }}
        />
      </View>
    </View>
  );
};

const availableDates = ['2022-05-31', '2022-05-29', '2022-05-30'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  addActiveDates: {
    alignItems: 'flex-end',
  },
  calendar: {
    paddingTop: 10,
    elevation: 2,
  },
  calendarContainer: {
    height: height / 2,
  },
  indicatorStyle: {
    backgroundColor: colors.primary,
  },
});

export default AvailableDates;
