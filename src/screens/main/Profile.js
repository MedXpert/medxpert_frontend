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

const Profile = ()=>{

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
  return(
    <View>
      <View style={StyleSheet.changePassword}>
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

      {/* Profile picture with edit button */}
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










    </View>
  )

}