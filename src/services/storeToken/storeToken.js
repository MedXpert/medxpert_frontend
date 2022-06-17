import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async userData => {
  const {access, refresh, uid, role} = userData 
  try {
    await AsyncStorage.setItem('@accessToken', access);
    await AsyncStorage.setItem('@refreshToken', refresh);
    await AsyncStorage.setItem('@uid', uid);
    await AsyncStorage.setItem('@role', role);
  } catch (e) {
    // saving error
    console.warn('OpeningForTheFirstTime store error:  ', e);
  }
};

export {storeToken};
