import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useContext} from 'react';

import Colors from '../../constants/colors';
import { CustomSpinner } from '../../components/general/CustomSpinner/Spinner';
import { AuthContext } from '../../components/general/Context';
const Splash = () => {
  const { loginStatus } = useContext(AuthContext);

  useEffect(() => {
      loginStatus()
  })
  return (
    <View style={styles.container}>
        <CustomSpinner isVisible={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteSmoke,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Splash;
