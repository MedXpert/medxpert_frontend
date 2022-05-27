import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';

import Colors from '../../constants/colors';
import Appointment from '../screens/main/Appointment';
import Home from '../screens/main/Home';
import Details from '../screens/main/Home/Details';
import Profile from '../screens/main/Profile';
import SvgProfile from '../../assets/svg/bottomNavbar/Profile.svg';
import SvgAppointment from '../../assets/svg/bottomNavbar/Appointment.svg';
import SvgActiveAppointment from '../../assets/svg/bottomNavbar/AppointmentActive.svg';
import SvgHome from '../../assets/svg/bottomNavbar/Home.svg';
import {CustomText} from '../../components/general/CustomText';
import ClaimRequest from '../screens/main/Home/ClaimRequest';
import EditHCF from '../screens/main/Profile/EditHCF';
import Claimed from '../screens/main/Profile/Claimed';
import UserProfile from '../screens/main/Profile/UserProfile';
import colors from '../../constants/colors';

const navigatorScreenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    // position: 'absolute',
    height: 70,
    borderTopWidth: 0,
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
  },
};

const homeScreenOptions = {
  tabBarIcon: ({focused}) => {
    let activeColor = focused ? Colors.primary : Colors.gray;
    return (
      <View style={{alignItems: 'center'}}>
        <SvgHome width={30} height={30} stroke={activeColor} />
        <CustomText content={'HOME'} fontSize={10} fontColor={activeColor} />
      </View>
    );
  },
};

const appointmentScreenOptions = {
  tabBarIcon: ({focused}) => {
    let activeColor = focused ? Colors.primary : Colors.gray;
    return (
      <View style={{alignItems: 'center'}}>
        {activeColor === Colors.gray && (
          <SvgAppointment width={30} height={30} />
        )}
        {activeColor === Colors.primary && (
          <SvgActiveAppointment width={30} height={30} />
        )}
        <CustomText
          content={'APPOINTMENT'}
          fontSize={10}
          fontColor={activeColor}
        />
      </View>
    );
  },
};

const profileScreenOptions = {
  tabBarIcon: ({focused}) => {
    let activeColor = focused ? Colors.primary : Colors.gray;
    return (
      <View style={{alignItems: 'center'}}>
        <SvgProfile width={30} height={30} fill={activeColor} />
        <CustomText content={'PROFILE'} fontSize={10} fontColor={activeColor} />
      </View>
    );
  },
};

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const AppointmentStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Details" component={Details} />
      </HomeStack.Group>
      <HomeStack.Group screenOptions={{headerShown: true}}>
        <HomeStack.Screen
          name="ClaimRequest"
          component={ClaimRequest}
          options={{title: 'Claim Request'}}
        />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};

const AppointmentStackScreen = () => {
  return (
    <AppointmentStack.Navigator>
      <AppointmentStack.Screen name="Appointment" component={Appointment} />
    </AppointmentStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Group screenOptions={{headerShown: false}}>
        <ProfileStack.Screen name="Profile" component={Profile} />
        <ProfileStack.Screen name="EditHCF" component={EditHCF} />
        <ProfileStack.Screen name="Claimed" component={Claimed} />
        <ProfileStack.Screen name="UserProfile" component={UserProfile} />
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  );
};

const NavigationStackHCF = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={navigatorScreenOptions}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={homeScreenOptions}
      />
      <Tab.Screen
        name="AppointmentStack"
        component={AppointmentStackScreen}
        options={appointmentScreenOptions}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={profileScreenOptions}
      />
    </Tab.Navigator>
  );
};

export default NavigationStackHCF;
