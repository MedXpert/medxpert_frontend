import {View, StyleSheet} from 'react-native';
import React from 'react';

import colors from '../../../constants/colors';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CustomText} from '../../general/CustomText';

const EmailItem = ({email}) => {
  return (
    <View style={styles.emailItemContainer}>
      <View style={styles.emailIconText}>
        <IconMaterialIcons
          name="email"
          size={30}
          color={colors.primary}
          style={{marginRight: 5}}
        />
        <CustomText content={email} />
      </View>
      <IconMaterialIcons
        name={'cancel'}
        color={colors.red}
        size={25}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emailItemContainer: {
    backgroundColor: colors.secondary,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  emailIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export {EmailItem};
