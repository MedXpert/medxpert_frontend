import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import Colors from '../../../constants/colors';

const PageIndicator = ({selectedPage}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.box,
          styles.box1,
          selectedPage === 1 ? styles.boxSelected : styles.boxOther,
        ]}
      />
      <View
        style={[
          styles.box,
          styles.box2,
          selectedPage === 2 ? styles.boxSelected : styles.boxOther,
        ]}
      />
      <View
        style={[
          styles.box,
          styles.box3,
          selectedPage === 3 ? styles.boxSelected : styles.boxOther,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  box: {
    height: 8,
    width: 30,
    borderRadius: 10,
  },
  box1: {
    backgroundColor: Colors.lightGray,
    marginRight: 5,
  },
  box2: {
    backgroundColor: Colors.dark,
    marginRight: 5,
  },
  box3: {
    backgroundColor: Colors.lightGray,
  },
  boxSelected: {
    backgroundColor: Colors.primary,
    width: 45,
  },
  boxOther: {
    backgroundColor: Colors.lightGray,
  },
});

export {PageIndicator};
