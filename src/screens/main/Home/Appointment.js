import {View, StyleSheet, Modal} from 'react-native';
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {CustomText} from '../../../components/general/CustomText';
import colors from '../../../constants/colors';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import shadow from '../../../constants/shadow';
import {CustomButton} from '../../../components/general/CustomButton';
import {BackButton} from '../../../components/general/BackButton';
import {CustomModal} from '../../../components/general/CustomModal/CustomModal';
import PushNotification, {Importance} from 'react-native-push-notification';
import RNDisableBatteryOptimizationsAndroid from 'react-native-disable-battery-optimizations-android';

const Appointment = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [YearMonthDateNow, setYearMonthDateNow] = useState('');
  const [isAppointmentPending, setIsAppointmentPending] = useState(false);
  const [isAppointmentScheduled, setIsAppointmentScheduled] = useState(false);
  const [appointmentStatus, setAppointmentStatus] = useState('');
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [selectedDay, setSelectedDay] = useState({});
  const [
    scheduleAppointmentModalVisibility,
    setScheduleAppointmentModalVisibility,
  ] = useState(false);
  const [
    cancelAppointmentModalVisibility,
    setCancelAppointmentModalVisibility,
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

  // Send appointment request to the health facility - api
  const sendAppointmentRequest = day => {
    // .log('Sent an appointment rquest');
  };

  const sendAppointmentCancel = day => {
    // console.log('Canceled appointment');
  };

  // Set appointment status from the api
  const getSetAppointmentStatus = () => {
    setAppointmentStatus('pending');
  };

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

  //Triggered when a day is pressed
  const onDayPress = day => {
    setSelectedDay(day);
    setScheduleAppointmentModalVisibility(true);
  };

  //When Yes button in the schedule appointment modal is pressed
  const onModalScheduleYesPressed = () => {
    //send appointment request to the health facility
    sendAppointmentRequest(selectedDay);
    setAppointmentStatus('Pending');
    setIsAppointmentPending(true);

    setScheduleAppointmentModalVisibility(false);
  };

  const onModalCancelYesPressed = () => {
    //send cancel appointment request to the health facility
    sendAppointmentCancel(selectedDay);
    setAppointmentStatus('');
    setIsAppointmentPending(false);
    setIsAppointmentScheduled(false);

    setCancelAppointmentModalVisibility(false);
  };

  const createAppointmentChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'appointmentNotificationChannel',
        channelName: 'Appointment Notification',
        channelDescription: 'A channel for appointment notification',
        playSound: true,
        soundName: 'default',
        importance: Importance.HIGH,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  const onReminderPressed = async () => {
    const isBatteryOptimizationEnabled =
      await RNDisableBatteryOptimizationsAndroid.isBatteryOptimizationEnabled();
    if (isBatteryOptimizationEnabled) {
      RNDisableBatteryOptimizationsAndroid.openBatteryModal();
    } else {
      setIsNotificationOn(!isNotificationOn);
    }
  };

  useEffect(() => {
    createAppointmentChannel();
  }, []);

  useEffect(() => {
    if (isNotificationOn) {
      PushNotification.localNotificationSchedule({
        channelId: 'appointmentNotificationChannel',
        // id: 'appointmentPushNotification',
        title: 'Appointment',
        allowWhileIdle: false,
        message: 'You have an appointment at 5 O"clock at Zewditu Hospital',
        date: new Date(Date.now() + 10 * 1000),
        bigText:
          'My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)',
        subText: 'This is a subText',
        bigPictureUrl: 'https://www.example.tld/picture.jpg',
      });
    } else {
      PushNotification.cancelAllLocalNotifications();
    }
  }, [isNotificationOn]);

  useEffect(() => {
    //Set the YearMonthDateNow variable to the current date (String)
    setYearMonthDateNow(getYearMonthDate());
    let availableDatesObj = getAvailableDates(); // store the available dates fetched from the health facility
    //Add the current date in the available dates object so that it will be enabled and set as the current date.
    availableDatesObj[getYearMonthDate()] = {
      disabled: false,
      marked: true,
      markedColor: colors.primary,
      disableTouchEvent: true,
    };

    if (selectedDay) {
      let dateString = selectedDay.dateString;
      var selectedDateObj = {};
      selectedDateObj[dateString] = {
        selected: true,
        selectedColor: isAppointmentPending
          ? colors.golden
          : isAppointmentScheduled
          ? colors.primary
          : null,
      };

      selectedDateObj[getYearMonthDate()] = {
        disabled: false,
        marked: true,
        markedColor: colors.primary,
        disableTouchEvent: true,
      };
    }

    // Set marked dates
    if (isAppointmentPending || isAppointmentScheduled) {
      setMarkedDates(selectedDateObj);
    } else {
      setMarkedDates(availableDatesObj);
    }
  }, [
    getAvailableDates,
    getYearMonthDate,
    selectedDay,
    isAppointmentPending,
    isAppointmentScheduled,
  ]);

  return (
    <View style={styles.container}>
      {/* Health facility info section */}
      <View style={styles.healthFacilityInfo}>
        {/* Health facility and back button */}
        <View style={styles.nameAndBackButton}>
          {/* <BackButton /> */}
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
      <CustomModal
        transparent
        visibility={scheduleAppointmentModalVisibility}
        animationType={'fade'}
        modalTitle={'Send request'}
        modalContent={
          'Do you want to schedule an appointment on ' +
          selectedDay.dateString +
          '?'
        }
        leftButtonTitle={'Cancel'}
        onPressLeftButton={() => {
          setScheduleAppointmentModalVisibility(false);
        }}
        rightButtonTitle={'Yes'}
        onPressRightButton={() => {
          onModalScheduleYesPressed();
          setTimeout(() => {
            setAppointmentStatus('Scheduled');
            setIsAppointmentScheduled(true);
            setIsAppointmentPending(false);
          }, 5000);
        }}
      />

      {/*

      {/* Cancel appointment modal */}
      <CustomModal
        transparent
        visibility={cancelAppointmentModalVisibility}
        animationType={'fade'}
        modalTitle={'Cancel Appointment'}
        modalContent={'Are you Sure you want to cancel this appointment?'}
        leftButtonTitle={'Cancel'}
        onPressLeftButton={() => {
          setCancelAppointmentModalVisibility(false);
        }}
        rightButtonTitle={'Yes'}
        onPressRightButton={onModalCancelYesPressed}
      />

      {/* Choose Appointment Calendar */}
      <View style={styles.chooseAppointment}>
        {/* <CustomText content={'Appointment'} fontSize={20} fontWeight={'400'} /> */}
        <View style={styles.calendarContainer}>
          {!isAppointmentPending && !isAppointmentScheduled && (
            <CustomText content={'Choose a date'} fontColor={colors.primary} />
          )}
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
          <View style={styles.datesLegend}>
            <View style={[styles.greenCircleLegend, styles.legendCircle]} />
            <CustomText content={'Available Dates'} />
          </View>
          <View style={styles.datesLegend}>
            <View style={[styles.goldenCircleLegend, styles.legendCircle]} />
            <CustomText content={'Pending Appointment'} />
          </View>
          <View style={styles.datesLegend}>
            <View style={[styles.blueCircleLegend, styles.legendCircle]} />
            <CustomText content={'Scheduled Appointment'} />
          </View>
        </View>
      </View>

      {/* Your appointments */}
      <View style={styles.yourAppointmentsContainer}>
        <View style={styles.titleAndCancelButton}>
          <CustomText
            content={'Your Appointment'}
            fontSize={16}
            fontColor={colors.primary}
          />
          {(isAppointmentPending || isAppointmentScheduled) && (
            <View style={styles.notificationAndCancel}>
              {/* Show notification icon if an appointment is scheduled */}
              {isAppointmentScheduled && (
                <FontAwesome
                  name={isNotificationOn ? 'bell' : 'bell-slash-o'}
                  color={isNotificationOn ? colors.primary : colors.gray}
                  size={20}
                  style={{marginRight: 15}}
                  onPress={() => {
                    // setIsNotificationOn(!isNotificationOn);
                    onReminderPressed();
                    // ... function to set notification to the appointment time
                  }}
                />
              )}

              {/*Cancel button is shown in 'Your appointment' section if an
              appointment is pending or scheduled*/}
              <CustomButton
                title={'Cancel'}
                height={30}
                width={75}
                fontSize={12}
                backgroundColor={colors.red}
                fontColor={colors.white}
                onPress={() => {
                  setCancelAppointmentModalVisibility(true);
                }}
              />
            </View>
          )}
        </View>
        <View style={styles.yourAppointmentsBody}>
          {(isAppointmentPending || isAppointmentScheduled) && (
            <>
              <CustomText content={'Apr 23, 2022'} />
            </>
          )}
          {isAppointmentScheduled && (
            <CustomText content={'10:00 AM - 11:00 AM'} />
          )}
          {(isAppointmentPending || isAppointmentScheduled) && (
            <View style={styles.appointmentStatus}>
              <CustomText content={'Status'} customStyles={{marginRight: 10}} />
              <CustomText content={appointmentStatus} fontColor={colors.gray} />
            </View>
          )}
          {isAppointmentScheduled && (
            <CustomText
              content={'Appointment ID    10219D32D '}
              fontColor={colors.lightGray}
            />
          )}
          {!isAppointmentPending && !isAppointmentScheduled && (
            <CustomText
              content={'No pending or scheduled Appointment.'}
              fontColor={colors.gray}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  datesLegend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentStatus: {
    flexDirection: 'row',
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
  legendCircle: {
    borderRadius: 50,
    height: 15,
    width: 15,
    marginRight: 20,
  },
  greenCircleLegend: {
    backgroundColor: colors.green,
  },
  goldenCircleLegend: {
    backgroundColor: colors.golden,
  },
  blueCircleLegend: {
    backgroundColor: colors.primary,
  },
  healthFacilityInfo: {},
  healthFacilityNameFont: {
    fontSize: 24,
    fontWeight: '600',
  },

  legendContainer: {
    marginLeft: 30,
    marginTop: 20,
  },
  location: {
    flexDirection: 'row',
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
  notificationAndCancel: {
    flexDirection: 'row',
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
    justifyContent: 'center',
    height: '70%',
  },
});
export default Appointment;
