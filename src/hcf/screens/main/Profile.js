import {View, useWindowDimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import Claimed from './Profile/Claimed';
import UserProfile from './Profile/UserProfile';
import colors from '../../../constants/colors';

const Profile = () => {
  const {height, width} = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const [routes] = React.useState([
    {key: 'claimed', title: 'Health care facilities'},
    {key: 'profile', title: 'Profile'},
  ]);

  const renderScene = SceneMap({
    claimed: Claimed,
    profile: UserProfile,
  });

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

export default Profile;
