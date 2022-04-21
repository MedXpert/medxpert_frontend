import {View, StyleSheet, Modal} from 'react-native';
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {CustomText} from '../../../components/general/CustomText';
import colors from '../../../constants/colors';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import shadow from '../../../constants/shadow';
import {CustomButton} from '../../../components/general/CustomButton';
import {BackButton} from '../../../components/general/BackButton';

const Appointment = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [YearMonthDateNow, setYearMonthDateNow] = useState('');
  const [isAppointmentScheduled, setIsAppointmentScheduled] = useState(false);
  const [selectedDay, setSelectedDay] = useState({});
  const [
    scheduleAppointmentModalVisibility,
    setScheduleAppointmentModalVisibility,
  ] = useState(false);

  //Get available dates set by health organizations (to be replaced by a result from the api)
  const getAvailableDates = useCallback(() => {
    var markedDatesObject = {
      '2022-04-13': {
        selected: true,
        selectedColor: colors.green,
        disabled: false,
      },
      '2022-04-14': {
        selected: true,
        selectedColor: colors.green,
        disabled: false,
      },
      '2022-04-15': {
        selected: true,
        selectedColor: colors.green,
        disabled: false,
      },
      '2022-04-16': {
        selected: true,
        selectedColor: colors.green,
        disabled: false,
      },
      '2022-04-18': {
        selected: true,
        selectedColor: colors.green,
        disabled: false,
      },
    };
    return markedDatesObject;
  }, []);

  // Returns the current Year, month and date as a string.
  const getYearMonthDate = useCallback(() => {
    let now = new Date();
    var [year, month, date] = [
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ];
    const setMonthTwoDigitString = () => {
      month = month + 1;
      let monthString = month.toString();
      if (monthString.length === 1) {
        return '0' + month;
      } else {
        return monthString;
      }
    };
    var YearMonthDateString =
      year.toString() + '-' + setMonthTwoDigitString() + '-' + date.toString();

    return YearMonthDateString;
  }, []);

  const onDayPress = day => {
    console.log(day);
    setScheduleAppointmentModalVisibility(true);
  };

  useEffect(() => {
    //Set the YearMonthDateNow variable to the current date (String)
    setYearMonthDateNow(getYearMonthDate());
    let availableDatesObj = getAvailableDates(); // store the available dates fetched from the health facility
    //Add the current date in the available dates object so that it will be enabled and set as the current date.
    availableDatesObj[getYearMonthDate()] = {
      disabled: false,
      marked: true,
      markedColor: colors.primary,
    };
    // set the markedDates variable to availableDatesObj
    setMarkedDates(availableDatesObj);
  }, [getAvailableDates, getYearMonthDate]);

  return (
    <View style={styles.container}>
      {/* Health facility info section */}
      <View style={styles.healthFacilityInfo}>
        {/* Health facility and back button */}
        <View style={styles.nameAndBackButton}>
          <BackButton />
          <CustomText
            content={'Health facility name'}
            customStyles={styles.healthFacilityNameFont}
          />
        </View>
        {/* Location of Health facility  */}
        <View style={styles.location}>
          <IconEntypo name="location-pin" size={20} color={colors.primary} />
          <CustomText content={'Address this '} />
        </View>
      </View>
      {/* Schedule Appointment Modal */}
      <Modal
        transparent
        visible={scheduleAppointmentModalVisibility}
        animationType={'fade'}>
        <View style={styles.scheduleAppointmentModal}>
          <View style={styles.innerScheduleAppointmentModal}>
            <CustomText
              content={
                'Do you want to schedule an appointment on ' +
                selectedDay.dateString +
                '?'
              }
            />
            <View style={styles.scheduleModalButtons}>
              <CustomButton
                title={'Cancel'}
                height={35}
                customStyle={{marginRight: 10}}
                backgroundColor={colors.lightGray}
                fontSize={13}
                onPress={() => {
                  setScheduleAppointmentModalVisibility(false);
                }}
              />
              <CustomButton title={'Yes'} height={35} fontSize={13} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Choose Appointment Calendar */}
      <View style={styles.chooseAppointment}>
        <CustomText content={'Appointment'} fontSize={20} fontWeight={'400'} />
        <View style={styles.calendarContainer}>
          <CustomText content={'Choose a date'} fontColor={colors.primary} />
          {/* Calendar */}
          <Calendar
            onDayPress={onDayPress}
            markedDates={markedDates}
            disabledByDefault
            hideExtraDays
            disableAllTouchEventsForDisabledDays
          />
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.availableDatesLegend}>
            <View style={styles.greenCircleLegend} />
            <CustomText content={'Available Dates'} />
          </View>
          <View style={styles.appointedDatesLegend}>
            <View style={styles.goldenCircleLegend} />
            <CustomText content={'Pending Appointment'} />
          </View>
        </View>
      </View>

      {/* Scheduled appointments */}
      <View style={styles.yourAppointmentsContainer}>
        <View style={styles.titleAndCancelButton}>
          <CustomText
            content={'Your Appointment'}
            fontSize={16}
            fontColor={colors.primary}
          />
          <CustomButton
            title={'Cancel'}
            height={30}
            width={80}
            fontSize={12}
            backgroundColor={colors.red}
            fontColor={colors.white}
          />
        </View>
        <View style={styles.yourAppointmentsBody}>
          <CustomText content={'Apr 23, 2022'} />
          <CustomText content={'10:00 AM - 11:00 AM'} />
          <View>
            <CustomText
              content={'Appointment ID    10219D32D '}
              fontColor={colors.lightGray}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appointedDatesLegend: {
    flexDirection: 'row',
  },
  availableDatesLegend: {
    flexDirection: 'row',
    marginTop: 15,
  },
  calendarContainer: {
    backgroundColor: colors.white,
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  chooseAppointment: {
    marginTop: 40,
  },
  greenCircleLegend: {
    borderRadius: 40,
    backgroundColor: colors.green,
    height: 20,
    width: 20,
    marginRight: 20,
  },
  goldenCircleLegend: {
    borderRadius: 40,
    backgroundColor: colors.golden,
    height: 20,
    width: 20,
    marginRight: 20,
  },
  healthFacilityInfo: {},
  healthFacilityNameFont: {
    fontSize: 24,
    fontWeight: '600',
  },
  innerScheduleAppointmentModal: {
    backgroundColor: colors.white,
    borderRadius: 20,
    height: 150,
    margin: 20,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendContainer: {
    marginLeft: 30,
    marginTop: 20,
  },
  location: {
    flexDirection: 'row',
    marginLeft: 40,
  },
  modalContainer: {
    // flex: 1,
    // justifyContent: 'center',
  },
  nameAndBackButton: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleAppointmentModal: {
    alignContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleModalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    width: '100%',
  },
  titleAndCancelButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yourAppointmentsContainer: {
    marginTop: 20,
    backgroundColor: colors.white,
    height: 180,
    padding: 15,
    elevation: 4,
  },
  yourAppointmentsBody: {
    justifyContent: 'space-evenly',
    // backgroundColor: 'red',
    height: '70%',
  },
});
export default Appointment;
