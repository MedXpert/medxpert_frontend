import {View, StyleSheet} from 'react-native';
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountDown from 'react-native-countdown-component';
import {CustomText} from '../../../components/general/CustomText';
import colors from '../../../constants/colors';
import {FallContext} from '../../../components/general/Context';
import {CustomButton} from '../../../components/general/CustomButton';
import {requestPermissions} from '../../../services/permissions/requestPermissions';

const FallDetected = () => {
  const [timer, setTimer] = useState(0);

  const {fallStatus} = useContext(FallContext);

  const onFinish = async () => {
    // Send sms message to emergency contacts

    // Send email to emergency contacts

    await AsyncStorage.removeItem('@fallDetected');
    fallStatus();
  };

  const onIAmOkay = async () => {
    await AsyncStorage.removeItem('@fallDetected');
    fallStatus();
  };

  return (
    <View style={styles.container}>
      <CustomText content={'minutes'} fontColor={colors.white} />
      <View>
        <CountDown
          until={15}
          onFinish={() => onFinish()}
          // onPress={() => alert('hello')}
          size={50}
          timeToShow={['S']}
        />
      </View>

      <View style={styles.textAndButton}>
        <CustomText
          content={'Possible fall detected. Are you okay?'}
          customStyles={{color: colors.white}}
          fontSize={18}
        />
        <View style={styles.buttons}>
          <CustomButton
            customStyle={{padding: 10}}
            title={'I am okay'}
            backgroundColor={colors.green}
            fontColor={colors.white}
            width={150}
            onPress={() => {
              onIAmOkay();
            }}
          />
          <CustomButton
            customStyle={{padding: 10}}
            backgroundColor={colors.dark}
            fontColor={colors.red}
            title={'I need help'}
            width={150}
            onPress={() => {
              onFinish();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
  },
  textAndButton: {
    marginTop: 40,
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
});

export default FallDetected;
