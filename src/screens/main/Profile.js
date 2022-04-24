import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import {CustomText} from '../../components/general/CustomText';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomText content={'Profile'} />
      <View style={styles.topbtn}>
        <TouchableOpacity>
          <Text>Change Password</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 25,
    zIndex: 10,
  },
  topbtn: {
    margin: 5,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 50,
    height: 20,
    width: 100,
  },
});
export default Profile;
