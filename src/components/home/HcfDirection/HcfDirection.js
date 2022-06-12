import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {CustomText} from '../../general/CustomText';
import {CustomButton} from '../../general/CustomButton';
import colors from '../../../constants/colors';

const HcfDirection = ({onDirection, onCancel}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://ui-avatars.com/api/?name=Yekakitit'}}
        style={{height: 120, width: 120}}
      />
      <View style={styles.rightSide}>
        <View style={styles.logoNameDetail}>
          <CustomText content={'Health Care Facility 1'} fontSize={22} />
          <View style={styles.details}>
            <CustomText content={'5 mins away'} />
          </View>
        </View>

        <View style={styles.buttons}>
          <CustomButton title={'Direction'} height={40} onPress={onDirection} />
          <CustomButton
            title={'Cancel'}
            height={40}
            customStyle={{backgroundColor: colors.lightGray}}
            onPress={onCancel}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    backgroundColor: colors.secondary,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoNameDetail: {},
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  rightSide: {
    marginLeft: 10,
  },
});

export {HcfDirection};
