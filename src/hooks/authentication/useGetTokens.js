import AsyncStorage from '@react-native-async-storage/async-storage';

const useGetToken = async () => {
  try {
    const access = await AsyncStorage.getItem('@accessToken');
    const refresh = await AsyncStorage.getItem('@refreshToken');
    const uid = await AsyncStorage.getItem('@uid');
    const role = await AsyncStorage.getItem('@role');

    return {access, refresh, uid, role}
  } catch (e) {
    // saving error
    console.warn('OpeningForTheFirstTime store error:  ', e);
  }
};

export {useGetToken};
