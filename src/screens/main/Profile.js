import {
  View,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import Colors from '../../constants/colors';
import { CustomText } from '../../components/general/CustomText';
import { CustomButton } from '../../components/general/CustomButton';
import { CustomTextInputValidation } from '../../components/general/CustomTextInputValidation';
import IconAnt from 'react-native-vector-icons/AntDesign';
import colors from '../../constants/colors';
import { useForm } from 'react-hook-form';
import { emailRegEx } from '../../constants/regEx';
import { AuthContext } from '../../components/general/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLoggedInUser, useUpdateProfile } from '../../hooks/authentication';
import { CustomSpinner } from '../../components/general/CustomSpinner/CustomSpinner';
import Toast from 'react-native-toast-message';
const Profile = () => {

  const { loginStatus } = useContext(AuthContext);

  const updateUserProfile = useUpdateProfile();

  const loggedInUser = useLoggedInUser();

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: ''
    }
  });

  const updateProfile = (data) => {
    const fullName = data.fullName.split(' ')
    const userInfo = {
      firstName: fullName[0],
      lastName: fullName[1],
      dateOfBirth: '2000-09-02',
      phoneNumber: data.phone,
      sex: 'm'
    }
    updateUserProfile.mutate({ ...userInfo })
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@accessToken');
    await AsyncStorage.removeItem('@refreshToken');
    await AsyncStorage.removeItem('@role');
    await AsyncStorage.removeItem('@userId');
    loginStatus();
  }

  if (loggedInUser.isSuccess) {
    const user = loggedInUser.data.data.user;
    setValue('fullName', user.firstName + ' ' + user.lastName)
    setValue('email', user.email)
    setValue('phone', user.phoneNumber)
  }


  if (updateUserProfile.isSuccess) {
    Toast.show({
      type: 'success',
      text1: "Updated Successfully",
      position: 'bottom'
    })
  }

  return (
    <View>
      {loggedInUser.isLoading && (
        <View style={styles.isLoading}>
          <CustomSpinner isVisible={loggedInUser.isLoading} type="WanderingCubes" />
        </View>)}
      {loggedInUser.isSuccess && (
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
              backgroundColor={Colors.primary}
              fontColor={Colors.white}
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
                source={{ uri: loggedInUser.data.data.profilePicture || `https://ui-avatars.com/api/?name=${loggedInUser.data.data.user.firstName + ' ' + loggedInUser.data.data.user.lastName}&background=random&size=120&bold=true&color=random&format=png` }}
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
              content={loggedInUser.data.data.user.firstName + ' ' + loggedInUser.data.data.user.lastName}
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
                validate: value => {
                  const fullName = value.split(' ');
                  if (fullName.length < 2) {
                    return 'At least father name is required.';
                  }
                  return true;
                }
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
              keyboardType="phone-pad"
              rules={{
                required: {
                  value: true,
                  message: "Phone is required"
                }
              }}
            />
            {/* <View>
              <CustomText content={'Birth Date(month-day-year)'} fontSize={15} fontColor={Colors.gray} />
              <Pressable onPress={() => setOpen(true)}>
                <DatePicker
                  modal
                  open={open}
                  date={birthDate}
                  onConfirm={(date) => {
                    setOpen(false)
                    setBirthDate(date)
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 350, backgroundColor: colors.white, borderRadius: 5, paddingVertical: 13, paddingHorizontal: 10 }}>
                  {birthDate === '' ? <CustomText content="Pick your birthday" customStyles={{ width: "75%" }} /> : (<CustomText content={birthDate.toLocaleDateString()} customStyles={{ width: "75%" }} />)}
                  <View style={{ background: Colors.primary }}>
                    <IconFontisto name="calendar" size={25} color={Colors.primary} />
                  </View>
                </View>
              </Pressable>
            </View> */}
            <CustomButton
              customStyle={{ marginTop: 20 }}
              title={updateUserProfile.isLoading ?"Updating...":"Update Profile"}
              width="100%"
              onPress={handleSubmit(updateProfile)}
            />
          </ScrollView>
        </View>)}
        
      <Toast />
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
  isLoading: { width: 350, height: 350, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' },
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


export default Profile;
