import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';

import Colors from '../../../constants/colors';
import {isRequired} from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
import {CustomText} from '../CustomText/CustomText';
import {Controller} from 'react-hook-form';
import colors from '../../../constants/colors';

const CustomTextInputValidation = ({
  label = null,
  control = isRequired(),
  rules = {required: true},
  name = isRequired(),
  customStyles = {},
  error = null,
  keyboardType,
  editable,
  multiline,
  numberOfLines,
  textAlignVertical,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <CustomText content={label} fontColor={Colors.gray} fontSize={15} />
      )}
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              keyboardType={keyboardType}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[styles.textInput, customStyles]}
              editable={editable}
              multiline={multiline}
              numberOfLines={numberOfLines}
              textAlignVertical={textAlignVertical}
              placeholder={placeholder}
              selectionColor={colors.primary}
            />
            {error && <CustomText content={error} fontColor={colors.red} />}
          </>
        )}
        name={name}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {marginBottom: 10},
  textInput: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 5,
    flexDirection: 'row',
    height: 50,
    color: Colors.dark,
    fontSize: 16,
    paddingHorizontal: 15,
  },
});

export {CustomTextInputValidation};
