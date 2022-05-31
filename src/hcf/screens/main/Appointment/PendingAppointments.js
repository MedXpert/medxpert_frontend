import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {CustomText} from '../../../../components/general/CustomText';
import colors from '../../../../constants/colors';
import {CustomButton} from '../../../../components/general/CustomButton';
import {FlatList} from 'react-native-gesture-handler';

const PendingAppointments = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [dateTime, setDateTime] = useState();

  const getTime = () => {};

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDecline = () => {
    alert('Declined');
  };

  const handleConfirm = date => {
    // Send the appointment data to the server
    console.warn(
      'A date has been picked: ',
      date.getHours(),
      date.getMinutes(),
    );
    hideDatePicker();
  };

  const appointments = [
    {user: 'John Doe', date: '2022-05-22'},
    {user: 'Ugulu wanga', date: '2022-05-20'},
  ];

  const renderAppointmentCard = ({item}) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <CustomText content={'Patient Name :'} fontSize={18} />
          <View style={styles.space10} />
          <CustomText content={item.user} fontSize={18} />
        </View>
        <View style={styles.appointmentDate}>
          <CustomText content={'Date :'} fontSize={15} />
          <View style={styles.space10} />
          <CustomText content={item.date} fontSize={15} />
        </View>
        <View style={styles.buttons}>
          <CustomButton
            title={'Decline'}
            backgroundColor={colors.red}
            customStyle={{paddingVertical: 5}}
            fontSize={14}
            height={'auto'}
            onPress={handleDecline}
          />
          <View style={styles.space10} />
          <CustomButton
            title={'Confirm'}
            customStyle={{paddingVertical: 5}}
            fontSize={14}
            height={'auto'}
            onPress={showDatePicker}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <FlatList
        data={appointments}
        renderItem={renderAppointmentCard}
        keyExtractor={item => item.user}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal: 15,
  },
  appointmentDate: {
    flexDirection: 'row',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  cardsContainer: {
    marginTop: 10,
  },
  card: {
    marginTop: 15,
    // height: 'auto',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    borderColor: colors.lightGray,
    borderWidth: 0.5,
  },
  cardHeader: {
    flexDirection: 'row',
  },
  space10: {
    marginHorizontal: 5,
  },
});

export default PendingAppointments;
