import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Spinner from 'react-native-spinkit';
import Colors from '../../../constants/colors';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';

const CustomSpinner = ({
    isVisible = isRequired(),
}) => {
    return (
        <View style={styles.spinnerContainer}>
            <Spinner
                isVisible={isVisible}
                color={Colors.primary}
                size={70}
                type="WanderingCubes"
            />
        </View>
    );
};
const styles = StyleSheet.create({
    spinnerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
});

export { CustomSpinner };
