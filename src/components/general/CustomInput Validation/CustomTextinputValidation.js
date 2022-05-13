import {View, TextInput, StyleSheet} from 'react-native';
import {CustomText} from '../CustomText/CustomText';
import React from 'react';

import Colors from '../../../constants/colors';
import {isRequired} from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
import {Controller} from 'react-hook-form';

const CustomTextInputValidation = ({
    label = null,
    control = isRequired(),
    rules = {required: true},
    name = isRequired(),
    customStyles = {},
}) => {


    return (
        <View style={styles.container}>
          {label && (
            <CustomText
              content={label}
              fontColor={Colors.lightGray}
              fontSize={16}
            />
          )}
          <Controller
            control={control}
            rules={rules}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={[styles.textInput, customStyles]}
              />
            )}
            name={name}
          />
        </View>
    );
};
    