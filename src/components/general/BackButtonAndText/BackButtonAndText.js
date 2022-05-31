import {View, StyleSheet} from 'react-native';
import React from 'react';

import {CustomText} from '../CustomText';
import {BackButton} from '../BackButton/BackButton';

const BackButtonAndText = ({navigation, text, fontSize = 22}) => {
  return (
    <View style={styles.header}>
      <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.headerText} />
      <CustomText content={text} fontSize={fontSize} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 20,
  },
});

export {BackButtonAndText};
