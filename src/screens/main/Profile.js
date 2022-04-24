import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';

import {CustomText} from '../../components/general/CustomText';
import {Icon} from 'react-native-vector-icons/Icon';

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
        <Image
          style={styles.headerImage}
          source={require('../../assets/svg/bottomNavbar/profile.svg')}
        />
      </View>

      <TouchableOpacity style={styles.probtn}>
        <Icon name="camera" color="gray" size={15} style={{padding: 10}} />
      </TouchableOpacity>

      <View style={{alignSelf: 'center', marginTop: 10}}>
        <Text style={{fontSize: 30, alignItems: 'center'}}>John Doe</Text>
      </View>
      <View style={{alignSelf: 'center', marginTop: 10}}>
        <Text style={styles.lable}>Full Name</Text>
        <TextInput placeholder="Name" style={styles.txtstyle}></TextInput>
      
        <Text style={styles.lable}>E-mail</Text>
        <TextInput placeholder="Example@gmail.com" style={styles.txtstyle}></TextInput>


        <Text style={styles.lable}>Phone Number</Text>
        <TextInput placeholder="(+xxx) xxxxx xxxx" textContentType="int" style={styles.txtstyle}></TextInput>

        <Text style={styles.lable}>User Name</Text>
        <TextInput placeholder="user name" keyboardType="password" style={styles.txtstyle}></TextInput>
       
      </View>
      <TouchableOpacity style={styles.updatebtn}>
        <Icon color="black" size={20}>
          Update{" "}
        </Icon>
      </TouchableOpacity>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 25,
    zIndex: 10,
  },
  topbtn: {
    margin: 5,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 50,
    height: 20,
    width: 100,
  },
  profilecontainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  headerImage: {
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 100,
    width: 150,
    height: 150,
  },
  probtn: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 50,
    alignSelf: 'center',
    marginLeft: 90,
    marginTop: -30,
    borderWidth: 1,
  },
  lable: {
    marginLeft: 10,
    fontSize: 15,
  },
  txtstyle: {
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    margin: 10,
    width: 300,
    borderRadius: 5,
    paddingLeft: 10,
  },
});
export default Profile;
