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
import EditImages from '../screens/main/Profile/EditImages';
import PendingAppointments from '../screens/main/Appointment/PendingAppointments';
import AvailableDates from '../screens/main/Appointment/AvailableDates';

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

// Options for Home bottom navbar tab
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
  headerShown: false,
};

// Options for Appointment bottom navbar tab
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

// Options for profile bottom navbar tab
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

const BottomNavbar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={navigatorScreenOptions}>
      <Tab.Screen name="Home" component={Home} options={homeScreenOptions} />
      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={appointmentScreenOptions}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={profileScreenOptions}
      />
    </Tab.Navigator>
  );
};

// Container for Bottom Navbar and other screen
const ContStack = createStackNavigator();

const NavigationStackHCF = () => {
  return (
    <ContStack.Navigator>
      {/* Screens with Bottom Navbar (the main ones) - Home, Appointment, Profile */}
      <ContStack.Screen
        name="BottomNavbar"
        component={BottomNavbar}
        options={{headerShown: false}}
      />
      <ContStack.Group screenOptions={{headerShown: false}}>
        <ContStack.Screen name="Details" component={Details} />
        <ContStack.Screen name="Claimed" component={Claimed} />
        <ContStack.Screen name="UserProfile" component={UserProfile} />
        <ContStack.Screen name="EditHCF" component={EditHCF} />
        <ContStack.Screen name="ClaimRequest" component={ClaimRequest} />
        <ContStack.Screen name="EditImages" component={EditImages} />
        <ContStack.Screen name="AvailableDates" component={AvailableDates} />
        <ContStack.Screen name="Pending" component={PendingAppointments} />
        <ContStack.Screen
          name="PendingAppointments"
          component={PendingAppointments}
        />
      </ContStack.Group>
    </ContStack.Navigator>
  );
};

export default NavigationStackHCF;
