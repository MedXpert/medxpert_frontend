import {View, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import React, {useMemo} from 'react';
import {useForm} from 'react-hook-form';

import colors from '../../../../constants/colors';
import {CustomText} from '../../../../components/general/CustomText';
import {BackButtonAndText} from '../../../../components/general/BackButtonAndText';
import {CustomButton} from '../../../../components/general/CustomButton';
import {CustomTextInputValidation} from '../../../../components/general/CustomTextInputValidation';
import {emailRegEx} from '../../../../constants/regEx';

const EditHCF = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      address: '',
      longitude: '',
      latitude: '',
      email: '',
      website: '',
      phoneNumber: '',
      tags: '',
      type: '',
      doctorCount: '',
      services: '',
      description: '',
      imageGallery: '',
    },
  });

  const {width, height} = useWindowDimensions();

  const onSave = data => {
    // console.log(data);
  };

  return (
    <View style={styles.container}>
      {/* Back button and text */}
      <BackButtonAndText
        text={'Edit Health Care Facility'}
        navigation={navigation}
      />
      {/* Top buttons container cancel | save */}
      <View style={styles.topButtonsContainer}>
        {/* Cancel button */}
        <CustomButton
          backgroundColor={colors.red}
          customStyle={{paddingVertical: 4}}
          title={'Cancel'}
          height="auto"
          onPress={() => navigation.goBack()}
        />
        {/* Space */}
        <View style={{marginHorizontal: 5}} />
        {/* Save button */}
        <CustomButton
          backgroundColor={colors.primary}
          title={'Save'}
          height="auto"
          onPress={handleSubmit(onSave)}
        />
      </View>
      {/* Form container */}
      <View style={styles.formContainer}>
        {/* Form  */}
        <ScrollView style={styles.form}>
          {/* Inner form Container */}
          <View style={styles.innerFormContainer}>
            {/* Name */}
            <CustomTextInputValidation
              customStyles={styles.textInput}
              control={control}
              name={'name'}
              label={'Name'}
              error={errors.name?.message}
              changeBorderOnFocus={true}
              rules={{
                required: {
                  value: true,
                  message: 'Name is required',
                },
              }}
            />
            {/* Address */}
            <CustomTextInputValidation
              customStyles={styles.textInput}
              control={control}
              name={'address'}
              label={'Address'}
              error={errors.address?.message}
              changeBorderOnFocus={true}
              rules={{
                required: {
                  value: true,
                  message: 'Address is required',
                },
              }}
            />
            <View style={styles.coordinates}>
              {/* Longitude */}
              <View style={styles.longLat}>
                <CustomTextInputValidation
                  customStyles={[styles.textInput]}
                  control={control}
                  name={'longitude'}
                  label={'Longitude'}
                  error={errors.longitude?.message}
                  changeBorderOnFocus={true}
                  keyboardType={'numeric'}
                  rules={{
                    required: {
                      value: true,
                      message: 'Longitude is required',
                    },
                  }}
                />
              </View>
              <View style={{marginHorizontal: 10}} />
              {/* Latitude */}
              <View style={styles.longLat}>
                <CustomTextInputValidation
                  customStyles={[styles.textInput]}
                  control={control}
                  name={'latitude'}
                  label={'Latitude'}
                  error={errors.latitude?.message}
                  changeBorderOnFocus={true}
                  keyboardType={'numeric'}
                  rules={{
                    required: {
                      value: true,
                      message: 'Latitude is required',
                    },
                  }}
                />
              </View>
            </View>
            {/* Email  */}
            <CustomTextInputValidation
              customStyles={styles.textInput}
              control={control}
              name={'email'}
              label={'Email'}
              error={errors.email?.message}
              changeBorderOnFocus={true}
              rules={{
                required: {
                  value: true,
                  message: 'Name is required',
                },
                pattern: {
                  value: emailRegEx,
                  message: 'Please enter a valid email address',
                },
              }}
            />
            {/* Website */}
            <CustomTextInputValidation
              customStyles={styles.textInput}
              control={control}
              name={'website'}
              label={'Website'}
              error={errors.website?.message}
              changeBorderOnFocus={true}
              rules={{
                required: {
                  value: true,
                  message: 'Website is required',
                },
              }}
            />
            {/* PhoneNumber */}
            <CustomTextInputValidation
              customStyles={styles.textInput}
              control={control}
              name={'phoneNumber'}
              label={'Phone Number'}
              keyboardType={'numeric'}
              error={errors.phoneNumber?.message}
              changeBorderOnFocus={true}
              rules={{
                required: {
                  value: true,
                  message: 'Phone Number is required',
                },
              }}
            />
            {/* Type */}
            <CustomTextInputValidation
              customStyles={styles.textInput}
              control={control}
              name={'type'}
              label={'Type'}
              error={errors.type?.message}
              changeBorderOnFocus={true}
              rules={{
                required: {
                  value: true,
                  message: 'Health care facility type is required',
                },
              }}
            />
            {/* DoctorCount */}
            <CustomTextInputValidation
              customStyles={styles.textInput}
              control={control}
              name={'doctorCount'}
              label={'Doctor Count'}
              error={errors.doctorCount?.message}
              changeBorderOnFocus={true}
              rules={{
                required: {
                  value: true,
                  message: 'Doctor Count is required',
                },
              }}
            />
            {/* Services */}
            <CustomTextInputValidation
              customStyles={styles.textInput}
              control={control}
              name={'services'}
              label={'Services'}
              error={errors.services?.message}
              changeBorderOnFocus={true}
              rules={{
                required: {
                  value: true,
                  message: 'Health care facility Services is required',
                },
              }}
            />
            {/* Description */}
            <CustomTextInputValidation
              customStyles={[styles.textInput, styles.textInputDescription]}
              control={control}
              multiline={true}
              numberOfLines={4}
              name={'description'}
              label={'Description'}
              error={errors.description?.message}
              textAlignVertical={'top'}
              changeBorderOnFocus={true}
              rules={{
                required: {
                  value: true,
                  message: 'Description is required',
                },
              }}
            />
            <View style={styles.imageGalleryButtonContainer}>
              <CustomButton
                title={'Edit Images'}
                width={'100%'}
                backgroundColor={colors.primary}
                customStyle={styles.editImageButton}
                onPress={() => {
                  navigation.push('EditImages');
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
  },

  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  form: {
    marginTop: 20,
  },
  formContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    marginTop: 10,
    borderTopRightRadius: 10,
    borderTopStartRadius: 10,
  },
  innerFormContainer: {
    paddingBottom: 140,
  },
  textInput: {
    backgroundColor: colors.secondary,
    borderWidth: 0.5,
    marginTop: 5,
    borderColor: colors.lightGray,
  },
  coordinates: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 1,
  },
  longLat: {
    flex: 1,
  },
  textInputDescription: {
    height: null,
  },
  imageGalleryButtonContainer: {
    marginTop: 10,
  },
  editImageButton: {
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.gray,
  },
});

export default EditHCF;
