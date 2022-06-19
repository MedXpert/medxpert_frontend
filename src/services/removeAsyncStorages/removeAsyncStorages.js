import AsyncStorage from "@react-native-async-storage/async-storage";
// AsyncStorage Remover.
const removeAsyncStorages = async listOfKeys => {
  listOfKeys.forEach(async element => {
    await AsyncStorage.removeItem(element);
  });
};

export {removeAsyncStorages};
