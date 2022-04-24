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
      <View style={styles.profilecontainer}>
        <Image style={styles.headerImage} source={require("../../assets/svg/bottomNavbar/profile.svg")}
                   
        />
      </View>

      <TouchableOpacity style={}>

      </TouchableOpacity>

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
  profilecontainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  headerImage: {
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: 100,
    width: 150,
    height: 150,
  },
  probtn: {
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 50,
    alignSelf: "center",
    marginLeft: 90,
    marginTop: -30,
    // height:40,width:40
    borderWidth: 1,
  },
});
export default Profile;
