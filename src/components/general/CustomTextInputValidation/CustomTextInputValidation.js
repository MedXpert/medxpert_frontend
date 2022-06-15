import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import Colors from '../../../constants/colors';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
import { CustomText } from '../CustomText/CustomText';
import { Controller } from 'react-hook-form';
import colors from '../../../constants/colors';

const CustomTextInputValidation = ({
  label = null,
  control = isRequired(),
  rules = { required: true },
  name = isRequired(),
  customStyles = {},
  error = null,
  keyboardType,
  editable,
  multiline,
  numberOfLines,
  textAlignVertical,
  placeholder,
  changeBorderOnFocus = false,
  secureTextEntry = false,
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <View style={styles.container}>
      {label && (
        <CustomText content={label} fontColor={Colors.gray} fontSize={15} />
      )}
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              onBlur={() => {
                setFocus(false);
                onBlur();
              }}
              onChangeText={onChange}
              value={value}
              style={[
                styles.textInput,
                customStyles,
                focus ? { borderWidth: 1, borderColor: colors.primary } : null,
              ]}
              editable={editable}
              multiline={multiline}
              numberOfLines={numberOfLines}
              textAlignVertical={textAlignVertical}
              placeholder={placeholder}
              selectionColor={colors.primary}
              changeBorderOnFocus={changeBorderOnFocus}
              onFocus={() => {
                if (changeBorderOnFocus) {
                  setFocus(true);
                }
              }}
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
  container: { marginBottom: 10 },
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

export { CustomTextInputValidation };
