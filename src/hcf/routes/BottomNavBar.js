import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Colors from '../../constants/colors';
import Appointment from '../screens/main/Appointment';
import Home from '../screens/main/Home';
import Profile from '../screens/main/Profile';
import SvgProfile from '../../assets/svg/bottomNavbar/Profile.svg';
import SvgAppointment from '../../assets/svg/bottomNavbar/Appointment.svg';
import SvgActiveAppointment from '../../assets/svg/bottomNavbar/AppointmentActive.svg';
import SvgHome from '../../assets/svg/bottomNavbar/Home.svg';
import {CustomText} from '../../components/general/CustomText';

const Tab = createBottomTabNavigator();

const BottomNavBar = ({route}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // position: 'absolute',
          height: 70,
          borderTopWidth: 0,
          // borderTopRightRadius: 30,
          // borderTopLeftRadius: 30,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            let activeColor = focused ? Colors.primary : Colors.gray;
            return (
              <View style={{alignItems: 'center'}}>
                <SvgHome width={30} height={30} stroke={activeColor} />
                <CustomText
                  content={'HOME'}
                  fontSize={10}
                  fontColor={activeColor}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={Appointment}
        options={{
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
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            let activeColor = focused ? Colors.primary : Colors.gray;
            return (
              <View style={{alignItems: 'center'}}>
                <SvgProfile width={30} height={30} fill={activeColor} />
                <CustomText
                  content={'PROFILE'}
                  fontSize={10}
                  fontColor={activeColor}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavBar;
