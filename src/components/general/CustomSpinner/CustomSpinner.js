import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Spinner from 'react-native-spinkit';
import Colors from '../../../constants/colors';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';

const CustomSpinner = ({
    isVisible = isRequired(),
    type = "WanderingCubes"
}) => {
    return (
        <Spinner
            isVisible={isVisible}
            color={Colors.primary}
            size={70}
            type={type}
        />
    );
};

export { CustomSpinner };
