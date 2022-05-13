import {View, StyleSheet, Switch} from 'react-native';
import React, {useState} from 'react';

import {CustomText} from '../../general/CustomText';
import colors from '../../../constants/colors';

const ToggleAutomation = ({text}) => {
  const [smsToggle, setSmsToggle] = useState(false);

  const onSmsToggleChange = () => {
    setSmsToggle(currentVal => !currentVal);
  };

  return (
    <View style={styles.smsToggle}>
      <CustomText content={text} fontSize={18} />
      <Switch
        trackColor={{false: colors.lightGray, true: colors.primary}}
        thumbColor={smsToggle ? colors.secondary : colors.gray}
        onValueChange={onSmsToggleChange}
        value={smsToggle}
        style={{width: '50%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  smsToggle: {
    height: 60,
    marginTop: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    borderRadius: 5,
  },
});

export default ToggleAutomation;
