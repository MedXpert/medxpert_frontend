import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async token => {
  try {
    await AsyncStorage.setItem('@token', token);
  } catch (e) {
    // saving error
    console.warn('OpeningForTheFirstTime store error:  ', e);
  }
};

export {storeToken};
