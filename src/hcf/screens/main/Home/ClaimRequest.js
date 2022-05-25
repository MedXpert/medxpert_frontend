import {View, StyleSheet, ScrollView, Flatlist} from 'react-native';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

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
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

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

  // Called when DocumentPicker button is pressed
  const onDocPick = async () => {
    try {
      const pickerRes = await DocumentPicker.pick({
        allowMultiSelection: true, // Multi Doc selection
        type: [types.images, types.pdf, types.doc, types.docx], // Types allowed
        presentationStyle: 'fullScreen', // fullscreen selection window
      });
      setResult(pickerRes); // Set the value to result state
    } catch (e) {
      handleDocPickerError(e);
    }
  };

  // Called when submit button is pressed
  const onSubmit = data => {
    if (result) {
      // If there is result store the result to the 'attachment' key of the data object from the form
      data.attachment = result;
    } else {
      console.warn('No data selected');
    }
    console.log(data); // Api function here
  };

  // Remove selected file from the list when the close icon is pressed
  const removeSelectedFile = index => {
    setResult(result.filter(item => item !== result[index]));
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
          {/* if there is doc result display the selected file's name and size */}
          {result && result.length > 0 && (
            <ScrollView style={styles.showSelected}>
              {result.map((item, index) => (
                <View style={styles.docItemStyle}>
                  <View style={styles.docItemText}>
                    <CustomText content={item.name} key={item} />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      removeSelectedFile(index);
                    }}>
                    <IconMaterial name="close" size={25} color={colors.red} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
          {/* Attachment button */}
          <View style={{marginTop: 20}} />
          <CustomButton
            title={'Attachment'}
            width={'100%'}
            customStyle={styles.attachmentButton}
            backgroundColor={colors.secondary}
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
            width={'100%'}
            onPress={handleSubmit(onSubmit)}
            customStyle={{marginBottom: 20}}
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
  attachmentButton: {
    borderWidth: 1,
    borderColor: colors.primary,
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
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 4,
    marginVertical: 5,
  },
});

const hcf = {
  name: 'HealthCare Facility 1',
};

export default ClaimRequest;
