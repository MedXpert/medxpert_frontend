import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import Colors from '../../constants/colors';
import CustomText from '../../components/general/CustomText';
import LoginSvg from '../../assets/svg/auth/login.svg';

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.loginSvgContainer}>
        <LoginSvg width={400} height={400} />
      </View>
      <View style={styles.loginFormContainer}>
        <CustomText content={'Sign in'} fontSize={28} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  loginFormContainer: {
    flex: 1,
    backgroundColor: Colors.whiteSmoke,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    marginTop: -70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    alignItems: 'center',
  },
  loginSvgContainer: {
    alignItems: 'center',
  },
});

export default Login;
