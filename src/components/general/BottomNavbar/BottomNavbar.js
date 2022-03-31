import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {IconButton} from 'react-native-paper';

import Colors from '../../../constants/colors';

const BottomNavbar = () => {
  return (
    <View style={styles.container}>
      <View>
        <IconButton
          icon="magnify"
          color={Colors.primary}
          size={25}
          onPress={() => {
            null;
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
});
export {BottomNavbar};
