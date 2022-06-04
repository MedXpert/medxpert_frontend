import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../components/general/Context';

import Colors from '../../constants/colors';
import { CustomText } from '../../components/general/CustomText';
import SignUpSvg from '../../assets/svg/auth/signUp.svg';
import { CustomButton } from '../../components/general/CustomButton';
import { storeToken } from '../../services/storeToken/storeToken';
import { useForm } from 'react-hook-form';
import { CustomTextInputValidation } from '../../components/general/CustomTextInputValidation';
import { useSignUp } from '../../hooks/authentication/useSignUp';
import colors from '../../constants/colors';

const SignUp = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const { loginStatus } = useContext(AuthContext);
  // sign up function
  const onSignUp = token => {
    storeToken(token);
    loginStatus();
  };
  const register = useSignUp();
  const onSubmit = data => {

    const fullName = data.fullName.split(' ')
    const newUser = {
      firstName: fullName[0],
      lastName: fullName[1] ? fullName[1] : '',
      email: data.email,
      password: data.password,
    }
    register.mutate({ ...newUser });
  };

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.signUpSvgContainer}>
        <SignUpSvg width={width} height={height / 5} />
      </View>
      {register.isSuccess ? (<View style={styles.successMessage}>
        <CustomText content="Welcome to MedXpert" fontSize={28} fontWeight="bold" customStyles={styles.welcomeText} />
        <CustomText content="Signed up successfully" fontSize={20} customStyles={styles.successText} />
        <CustomButton width={200}
          height={50} backgroundColor={colors.primary} title="Login" onPress={() => navigation.navigate('Login')} />
      </View>) : (
        <View style={styles.signUpFormContainer}>
          <View style={styles.signUpText}>
            <CustomText content={'Create Account'} fontSize={28} />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInputValidation
              customStyles={styles.inputs}
              label="Full Name"
              control={control}
              editable={!register.isLoading}
              name="fullName"
              error={errors.fullName?.message}
              rules={{
                required: {
                  value: true,
                  message: 'Full name is required.',
                },
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <CustomTextInputValidation
              customStyles={styles.inputs}
              label="Email"
              control={control}
              editable={!register.isLoading}
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
              editable={!register.isLoading}
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
          {/* 
        <View style={styles.inputContainer}>
          <CustomTextInputValidation
            customStyles={styles.inputs}
            label="Confirm Password"
            secureTextEntry={true}
            control={control}
            editable={!register.isLoading}
            name="confirmPassword"
            error={errors.confirmPassword?.message}
            rules={{
              required: {
                value: true,
                message: 'Confirm password is required.',
              },
            }}
          />
        </View> */}
          {register.isError && (<CustomText content={register.error.message} fontColor={Colors.red} />)}
          <View style={styles.buttonsContainer}>
            <CustomButton
              width={350}
              height={60}
              title={register.isLoading ? 'Please wait...' : 'Create Account'}
              customStyle={styles.signUpButtonStyle}
              onPress={handleSubmit(onSubmit)}
            />
            <View style={styles.registerContainer}>
              <CustomText content={'Joined us before?'} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <CustomText content={'Login'} fontColor={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  successMessage: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  welcomeText: { marginVertical: 5 },
  successText: { marginBottom: 20 },
  buttonsContainer: {
    marginTop: 0,
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
    borderRadius: 10,
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  inputs: {
    width: 350,
    height: 60,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default SignUp;
