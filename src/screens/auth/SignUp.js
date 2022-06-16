import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView
} from 'react-native';
import React, { useContext, useState } from 'react';
import Colors from '../../constants/colors';
import { CustomText } from '../../components/general/CustomText';
import SignUpSvg from '../../assets/svg/auth/signUp.svg';
import { CustomButton } from '../../components/general/CustomButton';
import { useForm } from 'react-hook-form';
import { CustomTextInputValidation } from '../../components/general/CustomTextInputValidation';
import { useSignUp } from '../../hooks/authentication/useSignUp';
import colors from '../../constants/colors';
import {emailRegEx} from '../../constants/regEx';
import { showMessage } from "react-native-flash-message";

const SignUp = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const [role, setRole] = useState('u');
  const register = useSignUp();
  const onSubmit = data => {

    const fullName = data.fullName.split(' ')
    const newUser = {
      firstName: fullName[0],
      lastName: fullName[1] ? fullName[1] : '',
      email: data.email,
      password: data.password,
      profilePicture: `https://ui-avatars.com/api/?name=${fullName}&background=random&size=120&bold=true&color=random&format=png`,
      role: role,
    }
    register.mutate({ ...newUser });
  };

  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      fullName: "Michael Belete",
      email: "mike@mike.com",
      password: "mike123",
      profilePicture: "",
    }
  });

  if (register.isError) {
    showMessage({
      message: "Error",
      description: register.error.response.data.error,
      type: "danger",
      icon: "danger",
      duration: 5000,
    });
  }

  return (
    <ScrollView>
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
                  validate: value => {
                    const fullName = value.split(' ');
                    if (fullName.length < 2) {
                      return 'please add your father name';
                    }
                    return true;
                  }
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
                  pattern: {
                    value: emailRegEx,
                    message: 'Please enter a valid email address',
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
                  validate: value => {
                    if (value.length < 6) {
                      return 'password must be at least 6 characters';
                    }
                    return true;
                  }

                }}
              />
            </View>

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
                  validate: (value) => {
                    // validate: {
                    //   emailEqual: value => (value === getValues().email) || 'Email confirmation error!',
                    // }
                    // if (watch('password') != val) {
                    //   return "Your passwords do no match";
                    // }
                    if (getValues().password !== value) {
                      return "Your passwords doesn't match";
                    }
                  },
                }}
              />
            </View>
            <View>
              <CustomText content="I am a" />
              <View style={{ width: 350, paddingVertical: 10, flexDirection: 'row', justifyContent: 'flex-start' }}>
                <CustomButton title="user" onPress={() => setRole('u')} fontSize={14} backgroundColor={(role === 'u') ? colors.primary : colors.whiteSmoke} width="30%" />
                <CustomButton title="Health Facility Owner" onPress={() => setRole('h')} fontSize={14} backgroundColor={(role === 'h') ? colors.primary : colors.whiteSmoke} width="40%" />
                <CustomButton title="Ambulance" onPress={() => setRole('am')} fontSize={14} backgroundColor={(role === 'am') ? colors.primary : colors.whiteSmoke} width="30%" />
              </View>
            </View>
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
    </ScrollView>
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
    height: 50,
    elevation:0.5
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default SignUp;
