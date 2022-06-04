import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, { useContext, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/colors';
import { CustomText } from '../../components/general/CustomText';
import LoginSvg from '../../assets/svg/auth/login.svg';
import { CustomButton } from '../../components/general/CustomButton';
import { AuthContext } from '../../components/general/Context';
import { storeToken } from '../../services/storeToken/storeToken';
import {useFetchTodo} from '../../hooks/authentication/index'
import { fetchTodo } from '../../services/api/authentication';
import axios from "axios";
const Login = ({ navigation }) => {

  const { height, width } = useWindowDimensions();
  const { loginStatus } = useContext(AuthContext);
  // Login function
  const onLogin = token => {
    storeToken(token);
    loginStatus();
  };


 return (
    <View style={styles.container}>
      <View style={styles.loginSvgContainer}>
        <LoginSvg width={width} height={height / 3} />
      </View>
      <ScrollView
        style={styles.loginFormContainer}
        contentContainerStyle={{ alignItems: 'center' }}>
        <View style={styles.loginText}>
          <CustomText content={'Login'} fontSize={28} />
        </View>
        <View style={styles.inputContainer}>
          <CustomText content={'Username or Email'} fontColor={Colors.gray} />
        </View>
        <View style={styles.inputContainer}>
          <CustomText content={'Password'} fontColor={Colors.gray} />

          {/* To be rendered conditionally. should be pressable/button. Toggles between show password and hide password. */}
          <Icon name="eye-outline" size={20} color={Colors.gray} />
          {/* <Icon name="eye-off-outline" size={20} color={Colors.gray} /> */}
        </View>
        <View style={styles.forgotPasswordContainer}>
          <CustomText content={'Forgot password?'} fontColor={Colors.primary} />
        </View>
        <View style={styles.buttonsContainer}>
          <CustomButton
            width={350}
            height={60}
            title={'Login'}
            customStyle={styles.loginButtonStyle}
            onPress={() => {
              onLogin('staticToken');
            }}
          />

          <View style={styles.registerContainer}>
            <CustomText content={'New to MedXpert?'} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <CustomText content={' Register'} fontColor={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <View />
      </ScrollView>
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
  },
  loginFormContainer: {
    padding: 30,
    paddingTop: 0,
  },
  loginSvgContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  loginButtonStyle: {
    borderRadius: 10,
    marginVertical: 10,
  },
  loginWithGoogleStyle: {
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    marginVertical: 10,
  },
  loginText: {
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
  orContainer: {
    marginVertical: 30,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default Login;
