import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../components/general/Context';

import Colors from '../../constants/colors';
import {CustomText} from '../../components/general/CustomText';
import SignUpSvg from '../../assets/svg/auth/signUp.svg';
import {CustomButton} from '../../components/general/CustomButton';
import {storeToken} from '../../services/storeToken/storeToken';

const SignUp = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const {loginStatus} = useContext(AuthContext);

  // sign up function
  const onSignUp = token => {
    storeToken(token);
    loginStatus();
  };

  return (
    <View style={styles.container}>
      <View style={styles.signUpSvgContainer}>
        <SignUpSvg width={width} height={height / 4} />
      </View>
      <View style={styles.signUpFormContainer}>
        <View style={styles.signUpText}>
          <CustomText content={'signUp'} fontSize={28} />
        </View>
        <View style={styles.inputContainer}>
          <CustomText content={'Full Name'} fontColor={Colors.gray} />
        </View>
        <View style={styles.inputContainer}>
          <CustomText content={'Email'} fontColor={Colors.gray} />
        </View>
        <View style={styles.inputContainer}>
          <CustomText content={'Password'} fontColor={Colors.gray} />
          {/* To be rendered conditionally. should be pressable/button. Toggles between show password and hide password. */}
          <Icon name="eye-outline" size={20} color={Colors.gray} />
          {/* <Icon name="eye-off-outline" size={20} color={Colors.gray} /> */}
        </View>

        <View style={styles.inputContainer}>
          <CustomText content={'Confirm Password'} fontColor={Colors.gray} />
        </View>
        <View style={styles.buttonsContainer}>
          <CustomButton
            width={350}
            height={60}
            title={'signUp'}
            customStyle={styles.signUpButtonStyle}
            onPress={() => {
              onSignUp('staticToken');
            }}
          />
          <View style={styles.registerContainer}>
            <CustomText content={'Joined us before?'} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <CustomText content={' Login'} fontColor={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  buttonsContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  signUpFormContainer: {
    alignItems: 'center',
    flex: 1,
    padding: 30,
    paddingTop: 0,
  },
  signUpSvgContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  signUpButtonStyle: {
    borderRadius: 10,
    marginVertical: 10,
  },
  signUpText: {
    marginBottom: 10,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 10,
    flexDirection: 'row',
    height: 60,
    marginBottom: 20,
    width: 350,
    paddingHorizontal: 15,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default SignUp;
