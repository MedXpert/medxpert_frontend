import { View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import colors from '../../../../constants/colors';
import { CustomText } from '../../../../components/general/CustomText';
import { BackButtonAndText } from '../../../../components/general/BackButtonAndText';
import { CustomButton } from '../../../../components/general/CustomButton';
import { CustomTextInputValidation } from '../../../../components/general/CustomTextInputValidation';
import { emailRegEx } from '../../../../constants/regEx';
import { useHealthCareFacility, useUpdateHealthCareFacility } from "../../../../hooks/healthCareFacility";
import { showMessage } from 'react-native-flash-message'
import Spinner from 'react-native-spinkit';
const EditHCF = ({ route, navigation }) => {

  const healthCareFacilityId = route.params.id;

  const healthCareFacility = useHealthCareFacility(healthCareFacilityId);

  const updateHealthFacility = useUpdateHealthCareFacility();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      address: '',
      email: '',
      website: '',
      phoneNumber: '',
      type: '',
      doctorCount: '',
      services: '',
      description: '',
    },
  });

  useEffect(() => {
    if (healthCareFacility.isSuccess) {
      const hcf = healthCareFacility.data;
      const phone = String(hcf.phoneNumbers.map(phone => phone).join(','))
      const services = String(hcf.services.map(service => service.name).join(','))

      setValue('name', hcf.name || '');
      setValue('address', hcf.address) || '';
      setValue('email', hcf.email || '');
      setValue('website', hcf.website || 'http://www.a.com');
      setValue('phoneNumber', phone);
      setValue('type', hcf.facility_type || '');
      setValue('doctorCount', hcf.doctorCount || '1');
      setValue('services', services || 'Doing this');
      setValue('description', hcf.description || 'nice');
    }
  }), [healthCareFacility];

  useEffect(() => {
    if (updateHealthFacility.isSuccess) {
      showMessage({
        message: "Updated",
        description: "Updated Successfully",
        type: "success",
        icon: "success",
        duration: 5000,
      });
    }
    if (updateHealthFacility.isError) {
      console.log(updateHealthFacility.error.response.data)
      showMessage({
        message: "Error",
        description: "Error occured updating please try again",
        type: "danger",
        icon: "danger",
        duration: 5000,
      });
    }
  }, [updateHealthFacility])
  const onSave = data => {
    const newData = { ...data, id: healthCareFacilityId, phoneNumber: data.phoneNumber.split(','), services: data.services.split(',') };

    updateHealthFacility.mutate(newData)
  };

  return (
    <View style={styles.container}>
      {healthCareFacility.isLoading && (
        <View style={styles.spinnerContainer}>
          <Spinner
            isVisible
            color={colors.primary}
            size={70}
            type="WanderingCubes"
            style={styles.appointmentsSpinner}
          />
        </View>
      )}
      {healthCareFacility.isSuccess && (
        <>
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
              customStyle={{ paddingVertical: 4 }}
              title={'Cancel'}
              height="auto"
              onPress={() => navigation.goBack()}
            />
            {/* Space */}
            <View style={{ marginHorizontal: 5 }} />
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
                {/* <View style={styles.coordinates}>
              Longitude
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
              Latitude
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
            </View> */}
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
                  label={'Website (E.g http://example.com)'}
                  error={errors.website?.message}
                  changeBorderOnFocus={true}
                  rules={{
                    validate: value => {
                      var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

                      if (!!pattern.test(value)) {

                        return true
                      } else {

                        return "please add a valid website"
                      }

                      // const fullName = value.split(' ');
                      // if (fullName.length < 2) {
                      //   return 'At least father name is required.';
                      // }
                      // return true;
                    }
                  }}
                />
                {/* PhoneNumber */}
                <CustomTextInputValidation
                  customStyles={styles.textInput}
                  control={control}
                  name={'phoneNumber'}
                  keyboardType={'phone-pad'}
                  label={'Phone Numbers(Separated by Comma)'}
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
                  label={'Health Care Facility Type(e.g. Hospital, Clinic, etc)'}
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
                  keyboardType={'phone-pad'}
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
                  label={'Services(Separated By comma)'}
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
                {/* <View style={styles.imageGalleryButtonContainer}>
              <CustomButton
                title={'Edit Images'}
                width={'100%'}
                backgroundColor={colors.primary}
                customStyle={styles.editImageButton}
                onPress={() => {
                  navigation.push('EditImages');
                }}
              />
            </View> */}
              </View>
            </ScrollView>
          </View>
        </>)}
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
    paddingTop: 10,
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
  spinnerContainer: {
    marginTop: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
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
