import {
  View,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import Colors from '../../constants/colors';
import { CustomText } from '../../components/general/CustomText';
import { CustomButton } from '../../components/general/CustomButton';
import { CustomTextInputValidation } from '../../components/general/CustomTextInputValidation';
import IconAnt from 'react-native-vector-icons/AntDesign';
import colors from '../../constants/colors';
import { useForm } from 'react-hook-form';
import { emailRegEx } from '../../constants/regEx';
import { AuthContext } from '../../components/general/Context';
import { useGetToken } from '../../hooks/authentication/useGetTokens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoggedInUser } from '../../hooks/authentication';

const Profile = () => {

  const { loginStatus } = useContext(AuthContext);

  const user = useGetToken();
  const loggedInUser = useLoggedInUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user.firstName + ' ' + user.lastName,
      email: user.email,
      phone: user.phone,
      username: user.username,
      sex: user.sex,
      address: user.address,
    },
  });
  const onSubmit = data => console.log(data);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@accessToken');
    await AsyncStorage.removeItem('@refreshToken');
    await AsyncStorage.removeItem('@role');
    await AsyncStorage.removeItem('@userId');
    loginStatus();
    
  }

  if(loggedInUser.isSuccess) {
    console.log('logged in user', loggedInUser.data);
  }

  if(loggedInUser.isError) {
    console.log('logged in user error', loggedInUser.error);
  }
  // useEffect(() => {
  //   // user.then((res) => console.log(res))
    
  // })
  return (
    <View>
      <View style={styles.changePassword}>
        <CustomButton
          title="Change password"
          backgroundColor={Colors.white}
          fontColor={Colors.dark}
          width={165}
          customStyle={styles.changePasswordButton}
          fontSize={14}
          fontWeight="bold"
          height={35}
        />
        <CustomButton
          title="Logout"
          backgroundColor={Colors.white}
          fontColor={Colors.dark}
          width={100}
          customStyle={styles.changePasswordButton}
          fontSize={14}
          fontWeight="bold"
          height={35}
          onPress={handleLogout}
        />
      </View>

      {/* profile picture with edit button */}
      <View style={styles.profilePictureWithEdit}>
        {/* profile picture here */}
        <View style={styles.profilePictureBorder}>
          <Image
            source={{ uri: user.profilePicture }}
            style={styles.profilePicture}
          />
          {/* image icon for changing profile */}
          <View style={styles.editProfilePicture}>
            <Pressable
              onPress={() => {
                console.log('clicked');
              }}>
              <IconAnt name="camera" size={25} color={Colors.lightGray} />
            </Pressable>
          </View>
        </View>
      </View>
      {/* name */}
      <View style={styles.fullName}>
        <CustomText
          content={user.firstName + ' ' + user.lastName}
          fontSize={25}
          fontColor={Colors.black}
        />
      </View>
      {/* form here */}
      <ScrollView style={styles.form}>
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
        <CustomTextInputValidation
          label="Email"
          control={control}
          name="email"
          error={errors.email?.message}
          rules={{
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value: emailRegEx,
              message: 'Invalid email',
            },
          }}
        />
        <CustomTextInputValidation
          label="Phone"
          control={control}
          name="phone"
          error={errors.phone?.message}
          keyboardType="numeric"
          rules={{
            required: {
              value: true,
              message: 'Phone number is required',
            },
          }}
        />
        <CustomTextInputValidation
          label="Username"
          control={control}
          name="username"
          error={errors.username?.message}
          rules={{
            required: {
              value: true,
              message: 'Username is required',
            },
          }}
        />
        <CustomButton
          customStyle={{ marginTop: 10 }}
          title="Update Profile"
          width="100%"
          onPress={handleSubmit(onSubmit)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  changePassword: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  changePasswordButton: {
    fontWeight: 'bold',
    borderRadius: 20,
    shadowColor: Colors.gray,
    elevation: 3,
  },
  profilePictureWithEdit: {
    flexDirection: 'row',
    paddingTop: 40,
    alignContent: 'center',
    justifyContent: 'center',
  },
  profilePictureBorder: {
    width: 125,
    height: 125,
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.white,
    shadowColor: colors.gray,
    elevation: 3,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  editProfilePicture: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 100,
    shadowColor: colors.gray,
    elevation: 3,
  },
  fullName: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 10,
  },
  form: {
    flexDirection: 'column',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
});

const user = {
  firstName: 'Naod',
  lastName: 'Dame',
  email: 'naol@gmail.com',
  phone: '9147854968',
  username: 'Naodo',
  sex: 'M',
  address: 'some place, some city, some country',
  profilePicture:
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
};

export default Profile;
