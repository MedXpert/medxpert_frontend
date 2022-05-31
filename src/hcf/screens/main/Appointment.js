import {View, useWindowDimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import AvailableDates from './Appointment/AvailableDates';
import PendingAppointments from './Appointment/PendingAppointments';

import colors from '../../../constants/colors';

const Appointment = ({navigation}) => {
  const {height, width} = useWindowDimensions();

  const renderScene = SceneMap({
    pending: PendingAppointments,
    availableDates: AvailableDates,
  });

  const [index, setIndex] = React.useState(0);

  const [routes] = useState([
    {key: 'pending', title: 'Pending '},
    {key: 'availableDates', title: 'Available Dates'},
  ]);

  // Render TabBar with customization
  const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor={colors.white}
      inactiveColor={colors.black}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
    />
  );

  return (
    // The main Tab view
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: width}}
    />
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.primary,
  },
  indicatorStyle: {backgroundColor: colors.white, height: 4},
});

export default Appointment;
