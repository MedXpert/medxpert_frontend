import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {CustomText} from '../../components/general/CustomText';
import {PageIndicator} from '../../components/welcome/PageIndicator';
import Colors from '../../constants/colors';
import LocateSvg from '../../assets/svg/welcome/locate.svg';
import {Button} from '../../components/welcome/Button';
import {WELCOME1_STRINGS} from '../../constants/string/welcome';

const Welcome1 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <PageIndicator selectedPage={1} />
        <View style={styles.textTop}>
          <CustomText
            content={WELCOME1_STRINGS.BRIEF_DESCRIPTION}
            fontSize={14}
            fontColor={'grey'}
          />
          <CustomText
            content={WELCOME1_STRINGS.TITLE}
            fontSize={32}
            fontFamily={'Poppins-Bold'}
          />
        </View>
        <View style={styles.LocateSvgContainer}>
          <LocateSvg width={500} height={500} />
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Button
          onPress={() => {
            navigation.navigate('Welcome2');
          }}
          title={'Next'}
        />
        <Button
          onPress={() => {
            navigation.navigate('Login');
          }}
          backgroundVisible={false}
          title={'Skip'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
    justifyContent: 'space-between',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  containerTop: {
    padding: 20,
  },
  textTop: {
    marginTop: 5,
  },
  LocateSvgContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default Welcome1;
