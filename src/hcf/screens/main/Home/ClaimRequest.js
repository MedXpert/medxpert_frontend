import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import { IconButton } from 'react-native-paper';

import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

import { CustomText } from '../../../../components/general/CustomText';
import colors from '../../../../constants/colors';
import { BackButton } from '../../../../components/general/BackButton';
import { CustomTextInputValidation } from '../../../../components/general/CustomTextInputValidation';
import { CustomButton } from '../../../../components/general/CustomButton';
import { emailRegEx } from '../../../../constants/regEx';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useHealthCareFacility } from '../../../../hooks/healthCareFacility';
import { color } from 'react-native-reanimated';
import { BackButtonAndText } from '../../../../components/general/BackButtonAndText';
import { useLoggedInUser } from "../../../../hooks/authentication";
import { useClaimRequest } from "../../../../hooks/claimRequest";
import { showMessage } from "react-native-flash-message";

const ClaimRequest = ({ route, navigation }) => {
  const [result, setResult] = useState();
  const healthCareFacilityId = route.params.id;



  const healthCareFacility = useHealthCareFacility(healthCareFacilityId);

  const loggedInUser = useLoggedInUser();


  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      hcfName: '',
      requesterFirstName: '',
      requesterLastName: '',
      requesterPhoneNumber: '',
      requesterEmail: '',
      message: '',
    },
  });

  if (healthCareFacility.isSuccess && loggedInUser.isSuccess) {
    const hcf = healthCareFacility?.data;
    const user = loggedInUser.data?.data.user;
    setValue('hcfName', hcf?.name);
    setValue('requesterFirstName', user?.firstName);
    setValue('requesterLastName', user?.lastName);
    setValue('requesterPhoneNumber', user?.phoneNumber);
    setValue('requesterEmail', user?.email);
  }

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

  // Called when DocumentPicker button is pressed
  const onDocPick = async () => {
    try {
      const pickerRes = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false, // Multi Doc selection
        // type: [types.images, types.pdf, types.doc, types.docx], // Types allowed
        presentationStyle: 'fullScreen', // fullscreen selection window

      });
      setResult(pickerRes); // Set the value to result state
    } catch (e) {
      handleDocPickerError(e);
    }
  };

  const claim = useClaimRequest();
  // Called when submit button is pressed
  const onSubmit = data => {
    data['healthFacilityID'] = healthCareFacilityId;
    delete data['hcfName'];
    
    claim.mutate(data);
  };


  if (claim.isError) {
    showMessage({
      message: "Error",
      description: "Error Occured contact the developer",
      type: "danger",
      icon: "danger",
      duration: 5000,
    });
  }

  if(claim.isSuccess) {
    showMessage({
      message: "Success",
      description: "Claim Request Sent! Please wait for the response",
      type: "success",
      icon: "success",
      duration: 3000,
    });
    
    navigation.goBack();
  }
  // Remove selected file from the list when the close icon is pressed
  // const removeSelectedFile = index => {
  //   setResult(result.filter(item => item !== result[index]));
  // };

  return (
    <View style={styles.container}>
      {/* <View style={styles.backButtonPageName}>
        <View style={styles.backButton}>
          <BackButton
            size={35}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <CustomText content={'Claim Request'} fontSize={18} fontWeight="600" />
      </View> */}
      <BackButtonAndText navigation={navigation} text={'Claim Request'} />
      <ScrollView style={styles.innerContainer} >
        <View style={styles.form}>
          {/* HCF Name */}
          <CustomTextInputValidation
            editable={false}
            customStyles={styles.textInput}
            control={control}
            name={'hcfName'}
            label={'Health Care Facility'}
          />
          {/* First Name */}
          <CustomTextInputValidation
            customStyles={styles.textInput}
            control={control}
            editable={false}
            name={'requesterFirstName'}
            label={'First Name'}
            error={errors.requesterFirstName?.message}
            changeBorderOnFocus={true}
            rules={{
              required: {
                value: true,
                message: 'First name is required',
              },
            }}
          />
          {/* Last Name */}
          <CustomTextInputValidation
            editable={false}
            customStyles={styles.textInput}
            control={control}
            name={'requesterLastName'}
            label={'Last Name'}
            error={errors.requesterLastName?.message}
            changeBorderOnFocus={true}
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
            name={'requesterPhoneNumber'}
            label={'Phone Number'}
            error={errors.requesterPhoneNumber?.message}
            changeBorderOnFocus={true}
            keyboardType={'phone-pad'}
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
            name={'requesterEmail'}
            label={'Email'}
            editable={false}
            error={errors.requesterEmail?.message}
            changeBorderOnFocus={true}
            rules={{
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: emailRegEx,
                message: 'Please enter a valid email address',
              },
            }}
          />
          {/* Message */}
          <CustomTextInputValidation
            customStyles={[styles.textInput, styles.textInputMessage]}
            control={control}
            multiline={true}
            numberOfLines={4}
            name={'message'}
            label={'Message'}
            error={errors.message?.message}
            textAlignVertical={'top'}
            changeBorderOnFocus={true}
            rules={{
              required: {
                value: true,
                message: 'Message is required',
              },
            }}
          />
          {/* if there is doc result display the selected file's name and size */}
          {result && result.length > 0 && (
            <ScrollView style={styles.showSelected}>
              {result.map((item, index) => (
                <View style={styles.docItemStyle} key={index}>
                  <View style={styles.docItemText}>
                    <CustomText content={item.name} key={item} />
                  </View>
                  <IconButton
                    icon={'window-close'}
                    size={25}
                    onPress={() => {
                      removeSelectedFile(index);
                    }}
                    color={colors.red}
                  />
                  {/* <TouchableOpacity
                    onPress={() => {
                      removeSelectedFile(index);
                    }}>
                    <IconMaterial name="close" size={25} color={colors.red} />
                  </TouchableOpacity> */}
                </View>
              ))}
            </ScrollView>
          )}
          {/* Attachment button */}
          {/* <View style={{ marginTop: 20 }} />
          <CustomButton
            title={'Attachment'}
            width={'100%'}
            fontColor={colors.black}
            customStyle={styles.attachmentButton}
            backgroundColor={colors.secondary}
            justifyContent={'center'}
            onPress={onDocPick}
            iconRight={true}
            icon={
              <IconMaterialCommunity
                name="attachment"
                size={30}
                color={colors.black}
                style={{ marginLeft: 10 }}
              />
            }
          /> */}
          <View style={{ marginTop: 15 }} />
          {/* Submit button */}
          <CustomButton
            title={claim.isLoading ? 'submitting please wait':'Submit'}
            width={'100%'}
            editable={!claim.isLoading}
            onPress={handleSubmit(onSubmit)}
            customStyle={{ marginBottom: 20 }}
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
  },
  attachmentButton: {
    borderWidth: 1,
    borderColor: colors.black,
  },
  innerContainer: {
    backgroundColor: colors.white,
    paddingTop: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    borderWidth: 0.5,
    borderColor: colors.lightGray,
  },
  textInputMessage: {
    height: null,
  },
  docItemText: {
    width: '85%',
  },
  showSelected: {
    height: 'auto',
    width: '100%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    padding: 10,
    marginTop: 10,
  },
  docItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.secondary,
    paddingVertical: 4,
    marginVertical: 5,
  },
});

export default ClaimRequest;
