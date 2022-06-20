import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../constants/colors';
import { CustomText } from '../../components/general/CustomText';
import LoginSvg from '../../assets/svg/auth/login.svg';
import { CustomButton } from '../../components/general/CustomButton';
import { AuthContext } from '../../components/general/Context';
import { storeToken } from '../../services/storeToken/storeToken';
import { useLogin } from '../../hooks/authentication/index'
import { CustomTextInputValidation } from '../../components/general/CustomTextInputValidation';
import { useForm } from 'react-hook-form';
import { showMessage } from "react-native-flash-message";

const Login = ({ navigation }) => {

  const { height, width } = useWindowDimensions();
  const { loginStatus } = useContext(AuthContext);

  const login = useLogin();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  // Login function
  const onLogin = data => {
    // storeToken(token);
    // loginStatus();
    login.mutate({...data});
  };

  if(login.isSuccess) {
    storeToken(
      {
        access: login.data?.data.access, 
        refresh: login.data?.data.refresh, 
        uid: login.data?.data.authenticatedUser.uid, 
        role: login.data?.data.authenticatedUser.role, 
      }
    );
    loginStatus();
  }

  
  if (login.isError) {
    showMessage({
      message: "Error",
      description: login.error.response.data.non_field_errors[0] || login.error.message,
      type: "danger",
      icon: "danger",
      duration: 5000,
    });
  }

  if(login.isSuccess) {
    showMessage({
      message: "Success",
      description: "Login successful",
      type: "success",
      icon: "success",
      duration: 3000,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginSvgContainer}>
        <LoginSvg width={width} height={height / 4} />
      </View>
      <ScrollView
        style={styles.loginFormContainer}
        contentContainerStyle={{ alignItems: 'center' }}>
        <View style={styles.loginText}>
          <CustomText content={'Login'} fontSize={28} />
        </View>
        <View style={styles.inputContainer}>
          {/* <CustomText content={'Username or Email'} fontColor={Colors.gray} /> */}
          <CustomTextInputValidation
            customStyles={styles.inputs}
            label="Email"
            control={control}
            editable={!login.isLoading}
            name="email"
            error={errors.email?.message}
            rules={{
              required: {
                value: true,
                message: 'Email is required.',
              },
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInputValidation
            customStyles={styles.inputs}
            secureTextEntry={true}
            label="Password"
            control={control}
            editable={!login.isLoading}
            name="password"
            error={errors.password?.message}
            rules={{
              required: {
                value: true,
                message: 'Password is required.',
              },
            }}
          />
        </View>
        <View style={styles.forgotPasswordContainer}>
          <CustomText content={'Forgot password?'} fontColor={Colors.primary} />
        </View>
        <View style={styles.buttonsContainer}>
          <CustomButton
            width={350}
            height={60}
            title={login.isLoading ? 'Please wait...' : 'Login'}
            customStyle={styles.signUpButtonStyle}
            onPress={handleSubmit(onLogin)}
          />

          <View style={styles.registerContainer}>
            <CustomText content={'New to MedXpert?'} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <CustomText content={'Register'} fontColor={Colors.primary} />
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
    borderRadius: 10,
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  inputs: {
    width: 330,
    height: 60,
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
