import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, { useContext } from 'react';
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
      fullName: "michael belete",
      email: "mike@random.com",
      password: "mike123"
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.signUpSvgContainer}>
        <SignUpSvg width={width} height={height / 4} />
      </View>
      <View style={styles.signUpFormContainer}>
        <View style={styles.signUpText}>
          <CustomText content={'Create Account'} fontSize={28} />
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInputValidation
            label="Full Name"
            control={control}
            name="fullName"
            error={errors.fullName?.message}
            rules={{
              required: {
                value: true,
                message: 'Full name is required.',
              },
            }}
          />
          {/* <CustomText content={'Full Name'} fontColor={Colors.gray} /> */}
        </View>
        <View style={styles.inputContainer}>
          <CustomTextInputValidation
            label="Email"
            control={control}
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
            label="Password"
            control={control}
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

        <View style={styles.inputContainer}>
          <CustomTextInputValidation
            label="Confirm Password"
            control={control}
            name="confirmPassword"
            error={errors.confirmPassword?.message}
            rules={{
              required: {
                value: true,
                message: 'Full name is required.',
              },
            }}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <CustomButton
            width={350}
            height={60}
            title={register.isLoading ? 'Creating account...':'Create Account'}
            customStyle={styles.signUpButtonStyle}
            onPress={handleSubmit(onSubmit)}
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
