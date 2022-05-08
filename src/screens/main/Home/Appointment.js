import {View, StyleSheet, Modal, ActivityIndicator} from 'react-native';
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
import {
  useAppointment,
  useCreateAppointment,
  useDeleteAppointment,
} from '../../../hooks/appointment';
import {readAsyncStorage} from '../../../services/readAsyncStorage';
import {AppointmentModel} from '../../../models/Appointment';
import {useHealthCareFacility} from '../../../hooks/healthCareFacility';
import {create} from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Appointment = ({route, navigation}) => {
  // const [markedDates, setMarkedDates] = useState({});
  // const [availableDates, setAvailableDates] = useState([]);
  // const [YearMonthDateNow, setYearMonthDateNow] = useState('');
  const [isAppointmentPending, setIsAppointmentPending] = useState(false);
  const [isAppointmentScheduled, setIsAppointmentScheduled] = useState(false);
  const [appointmentStatus, setAppointmentStatus] = useState('');
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});

  const [
    scheduleAppointmentModalVisibility,
    setScheduleAppointmentModalVisibility,
  ] = useState(false);
  const [
    cancelAppointmentModalVisibility,
    setCancelAppointmentModalVisibility,
  ] = useState(false);

  const hcfId = route.params.hcfId;
  const appointment = useAppointment(hcfId);
  const createAppointment = useCreateAppointment();
  const healthCareFacility = useHealthCareFacility(hcfId);
  const deleteAppointment = useDeleteAppointment();

  // Returns the current Year, month and date as a string.
  const getYearMonthDate = () => {
    let now = new Date();
    var [year, month, date] = [
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ];

    var YearMonthDateString =
      year.toString() +
      '-' +
      (month + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      '-' +
      date.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

    return YearMonthDateString;
  };

  //Triggered when a day is pressed
  const onDayPress = day => {
    setSelectedDate(day);

    setScheduleAppointmentModalVisibility(true);
  };

  // Send appointment request to the health facility - api
  const sendAppointmentRequest = async () => {
    var appointmentModel = new AppointmentModel(
      null,
      await readAsyncStorage('userId'),
      hcfId,
      healthCareFacility.data.type,
      selectedDate.dateString,
      appointmentStatus,
    );

    createAppointment.mutate(appointmentModel);
  };

  const sendAppointmentCancel = day => {
    // console.log('Canceled appointment');
  };

  //When Yes button in the schedule appointment modal is pressed
  const onModalScheduleYesPressed = () => {
    //send appointment request to the health facility
    setAppointmentStatus('pending');

    sendAppointmentRequest();

    setScheduleAppointmentModalVisibility(false);
  };

  const onModalCancelYesPressed = () => {
    //send cancel appointment request to the health facility
    sendAppointmentCancel(selectedDate);

    if (appointment.data) {
      deleteAppointment.mutate(appointment.data.id);
    }

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
      // created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
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

  const markedDates = () => {
    var avDatesCurrDateObj = {}; // available dates and current date object

    if (healthCareFacility.data && !appointment.data) {
      //set properties of available dates (for the calendar)
      healthCareFacility.data.availableDates.map(avDate => {
        avDatesCurrDateObj[avDate] = {
          selected: true,
          selectedColor: colors.green,
          disabled: false,
        };
      });
      //set properties of current date
      avDatesCurrDateObj[getYearMonthDate()] = {
        disabled: false,
        marked: true,
        markedColor: colors.primary,
        disableTouchEvent: true,
      };

      return avDatesCurrDateObj;
    }
    //if there is an appointment
    else if (appointment.data) {
      var selectedDateObj = {};
      const dat = new Date(appointment.data.dateTime);
      console.log(dat);
      const appointmentDateString =
        dat.getFullYear().toString() +
        '-' +
        (dat.getMonth() + 1).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }) +
        '-' +
        (dat.getDate() + 1).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });

      console.log(appointmentDateString);

      selectedDateObj[appointmentDateString] = {
        selected: true,

        selectedColor:
          appointment.data.status === 'pending'
            ? colors.golden
            : appointment.data.status === 'scheduled'
            ? colors.primary
            : null,
      };
      selectedDateObj[getYearMonthDate()] = {
        disabled: false,
        marked: true,
        markedColor: colors.primary,
        disableTouchEvent: true,
      };
      return selectedDateObj; //return selectedDateObj if there is an appointment [scheduled / pending]
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

  return (
    <View style={styles.container}>
      {(appointment.isLoading || healthCareFacility.isLoading) && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{justifyContent: 'center', flex: 1}}
        />
      )}

      {appointment.isError && (
        <View style={{justifyContent: 'center', flex: 1}}>
          <CustomText content={appointment.error} />
        </View>
      )}

      {healthCareFacility.isError && (
        <View style={{justifyContent: 'center', flex: 1}}>
          <CustomText content={healthCareFacility.error} />
        </View>
      )}

      {appointment.isSuccess && healthCareFacility.isSuccess && (
        <>
          {/* Health facility info section */}
          <View style={styles.healthFacilityInfo}>
            {/* Health facility and back button */}
            <View style={styles.nameAndBackButton}>
              {/* <BackButton /> */}
              <CustomText
                content={healthCareFacility.data.name}
                customStyles={styles.healthFacilityNameFont}
              />
            </View>
            {/* Location of Health facility  */}
            <View style={styles.location}>
              <IconEntypo
                name="location-pin"
                size={20}
                color={colors.primary}
              />
              <CustomText content={healthCareFacility.data.address} />
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
              selectedDate.dateString +
              '?'
            }
            leftButtonTitle={'Cancel'}
            onPressLeftButton={() => {
              setScheduleAppointmentModalVisibility(false);
            }}
            rightButtonTitle={'Yes'}
            onPressRightButton={() => {
              onModalScheduleYesPressed();
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
            <View style={styles.calendarContainer}>
              {/* If there is no appointment show choose a date text */}
              {!appointment.data && (
                <CustomText
                  content={'Choose a date'}
                  fontColor={colors.primary}
                />
              )}

              {/* Calendar */}
              <Calendar
                onDayPress={onDayPress}
                markedDates={markedDates()}
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
                <View
                  style={[styles.goldenCircleLegend, styles.legendCircle]}
                />
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
              {appointment.data && (
                <View style={styles.notificationAndCancel}>
                  {/* Show notification icon if an appointment is scheduled */}
                  {appointment.data.status === 'scheduled' && (
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
              {appointment.data && (
                <>
                  <CustomText
                    content={new Date(appointment.data.dateTime).toDateString()}
                  />
                  {appointment.data.status === 'scheduled' && (
                    <CustomText
                      content={new Date(
                        appointment.data.dateTime,
                      ).toLocaleTimeString()}
                    />
                  )}
                  {/* Show the status of the appointment  */}
                  <View style={styles.appointmentStatus}>
                    <CustomText
                      content={'Status'}
                      customStyles={{marginRight: 10}}
                    />
                    <CustomText
                      content={appointment.data.status}
                      fontColor={colors.gray}
                    />
                  </View>
                  {appointment.data.status === 'scheduled' && (
                    <CustomText
                      content={'Appointment ID  ' + appointment.data.id}
                      fontColor={colors.lightGray}
                    />
                  )}
                </>
              )}

              {!appointment.data && (
                <CustomText
                  content={'No pending or scheduled Appointment.'}
                  fontColor={colors.gray}
                />
              )}
            </View>
          </View>
        </>
      )}
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
    marginTop: 20,
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
    marginTop: 30,
    backgroundColor: colors.white,
    height: 180,
    padding: 15,
    elevation: 4,
  },
  yourAppointmentsBody: {
    justifyContent: 'center',
    height: '80%',
  },
});
export default Appointment;
