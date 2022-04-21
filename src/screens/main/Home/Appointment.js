import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import {CustomText} from '../../../components/general/CustomText';
import colors from '../../../constants/colors';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IonIcons from 'react-native-vector-icons/Ionicons';
import shadow from '../../../constants/shadow';
import {CustomButton} from '../../../components/general/CustomButton';
import {BackButton} from '../../../components/general/BackButton';

const Appointment = () => {
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
      {/* Choose Appointment Calendar */}
      <View style={styles.chooseAppointment}>
        <CustomText content={'Appointment'} fontSize={20} fontWeight={'400'} />
        <View style={styles.calendarContainer}>
          <CustomText content={'Choose a date'} fontColor={colors.primary} />
          <Calendar />
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.appointedDatesLegend}>
            <View style={styles.blueCircleLegend} />
            <CustomText content={'Scheduled Appointments'} />
          </View>
          <View style={styles.availableDatesLegend}>
            <View style={styles.greenCircleLegend} />
            <CustomText content={'Scheduled Appointments'} />
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
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  appointedDatesLegend: {
    flexDirection: 'row',
  },
  availableDatesLegend: {
    flexDirection: 'row',
    marginTop: 15,
  },
  blueCircleLegend: {
    borderRadius: 40,
    backgroundColor: colors.primary,
    height: 20,
    width: 20,
    marginRight: 20,
  },
  greenCircleLegend: {
    borderRadius: 40,
    backgroundColor: colors.green,
    height: 20,
    width: 20,
    marginRight: 20,
  },
  calendarContainer: {
    backgroundColor: colors.white,
    marginTop: 20,
    padding: 10,
    borderRadius: 15,
    elevation: 5,
  },
  chooseAppointment: {
    marginTop: 40,
  },
  healthFacilityInfo: {},
  healthFacilityNameFont: {
    fontSize: 24,
    fontWeight: '600',
  },
  legendContainer: {
    marginLeft: 30,
    marginTop: 30,
  },
  location: {
    flexDirection: 'row',
    marginLeft: 40,
  },
  nameAndBackButton: {
    flexDirection: 'row',
    width: '85%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
