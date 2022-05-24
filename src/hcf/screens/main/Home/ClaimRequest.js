import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

import {CustomText} from '../../../../components/general/CustomText';
import colors from '../../../../constants/colors';
import {BackButton} from '../../../../components/general/BackButton';
import {CustomTextInputValidation} from '../../../../components/general/CustomTextInputValidation';
import {CustomButton} from '../../../../components/general/CustomButton';
import {emailRegEx} from '../../../../constants/regEx';

const ClaimRequest = () => {
  const [result, setResult] = useState();
  // Declare useForm
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: hcf.name,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      message: '',
      attachment: '',
    },
  });

  // Document picker error handler
  const handleDocPickerError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  //Called when DocumentPicker button is clicked
  const onDocPick = async () => {
    try {
      const pickerRes = await DocumentPicker.pick({
        allowMultiSelection: true, // Multi Doc selection
        type: [types.images, types.pdf, types.doc, types.docx], // Types allowed
        presentationStyle: 'fullScreen', // fullscreen selection window
      });
      setResult(pickerRes); // Set the value to result state
      console.log(result);
    } catch (e) {
      handleDocPickerError(e);
    }
  };

  // Called when submit button is clicked
  const onSubmit = data => {
    if (result) {
      // If there is result store the result to the 'attachment' key of the data object from the form
      data.attachment = result;
    } else {
      console.warn('No data selected');
    }
    console.log(data); // Api function here
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonPageName}>
        <View style={styles.backButton}>
          {/* <IonIcons name="arrow-back" size={30} color={colors.primary} /> */}
          <BackButton size={30} />
        </View>
        <CustomText content={'Claim Request'} fontSize={18} fontWeight="600" />
      </View>
      <ScrollView style={styles.innerContainer}>
        <View style={styles.form}>
          {/* HCF Name */}
          <CustomTextInputValidation
            editable={false}
            customStyles={styles.textInput}
            control={control}
            name={'name'}
            label={'Name'}
          />
          {/* First Name */}
          <CustomTextInputValidation
            customStyles={styles.textInput}
            control={control}
            name={'firstName'}
            label={'First Name'}
            error={errors.firstName?.message}
            rules={{
              required: {
                value: true,
                message: 'First name is required',
              },
            }}
          />
          {/* Last Name */}
          <CustomTextInputValidation
            customStyles={styles.textInput}
            control={control}
            name={'lastName'}
            label={'Last Name'}
            error={errors.lastName?.message}
            rules={{
              required: {
                value: true,
                message: 'Last name is required',
              },
            }}
          />
          {/* Phone Number */}
          <CustomTextInputValidation
            customStyles={styles.textInput}
            control={control}
            keyboardType="numeric"
            name={'phoneNumber'}
            label={'Phone Number'}
            error={errors.phoneNumber?.message}
            rules={{
              required: {
                value: true,
                message: 'Phone number is required',
              },
            }}
          />
          {/* Email */}
          <CustomTextInputValidation
            customStyles={styles.textInput}
            control={control}
            name={'email'}
            label={'Email'}
            error={errors.email?.message}
            rules={{
              required: {
                value: true,
                message: 'Email name is required',
              },
              pattern: {
                value: emailRegEx,
                message: 'Invalid email',
              },
            }}
          />
          {/* Message */}
          <CustomTextInputValidation
            customStyles={[styles.textInput]}
            control={control}
            multiline={true}
            numberOfLines={4}
            name={'message'}
            label={'Message'}
            error={errors.message?.message}
            textAlignVertical={'top'}
            rules={{
              required: {
                value: true,
                message: 'Message is required',
              },
            }}
          />
          {/* Attachment button */}
          <View style={{marginTop: 20}} />
          <CustomButton
            title={'Attachment'}
            width={350}
            backgroundColor={colors.lightGray}
            justifyContent={'center'}
            onPress={onDocPick}
            iconRight={true}
            icon={
              <IconMaterialCommunity
                name="attachment"
                size={30}
                color={colors.primary}
                style={{marginLeft: 10}}
              />
            }
          />
          <View style={{marginTop: 15}} />
          {/* Submit button */}
          <CustomButton
            title={'Submit'}
            width={350}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  innerContainer: {
    backgroundColor: colors.white,
    flex: 1,
    marginTop: 5,
    paddingTop: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  backButtonPageName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: colors.secondary,
    marginTop: 5,
    elevation: 0.4,
  },
});

const hcf = {
  name: 'HealthCare Facility 1',
};

export default ClaimRequest;
