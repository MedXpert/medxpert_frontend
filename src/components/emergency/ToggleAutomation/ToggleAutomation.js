import {View, StyleSheet, Switch} from 'react-native';
import React, {useState} from 'react';

import {CustomText} from '../../general/CustomText';
import colors from '../../../constants/colors';

const ToggleAutomation = ({text}) => {
  const [toggle, setToggle] = useState(false);

  const onSmsToggleChange = () => {
    setToggle(currentVal => !currentVal);
  };

  return (
    <View style={styles.toggle}>
      <CustomText content={text} fontSize={18} />
      <Switch
        trackColor={{false: colors.lightGray, true: colors.primary}}
        thumbColor={toggle ? colors.secondary : colors.gray}
        onValueChange={onSmsToggleChange}
        value={toggle}
        style={{width: '50%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toggle: {
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

export {ToggleAutomation};
