import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../../constants/colors';
import {CustomText} from '../../components/general/CustomText';
import {CustomButton} from '../../components/general/CustomButton';
import {CustomTextInputValidation} from '../../components/general/CustomTextInputValidation';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import IconAnt from 'react-native-vector-icons/AntDesign';
import colors from '../../constants/colors';
import {useForm} from 'react-hook-form';

const Profile = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
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
      </View>

      {/* profile picture with edit button */}
      <View style={styles.profilePictureWithEdit}>
        {/* profile picture here */}
        <View style={styles.profilePictureBorder}>
          <Image
            source={{uri: user.profilePicture}}
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
      <View style={styles.form}>
        <CustomTextInputValidation
          label="Full Name"
          control={control}
          name="fullName"
        />
        <CustomTextInputValidation
          label="Email"
          control={control}
          name="email"
        />
        <CustomTextInputValidation
          label="Phone"
          control={control}
          name="phone"
        />
        <CustomTextInputValidation
          label="Username"
          control={control}
          name="username"
        />
        <CustomButton
          customStyle={{marginTop: 10}}
          title="Update Profile"
          width='100%'
          onPress={handleSubmit(onSubmit)}
        />
      </View>






    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const styles = StyleSheet.create({
  changePassword: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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




export default Profile;
