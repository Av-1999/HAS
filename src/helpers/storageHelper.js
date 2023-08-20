import AsyncStorageStatic from "@react-native-community/async-storage";

export const setItem = async (key, value) => {
  await AsyncStorageStatic.setItem(
    key,
    JSON.stringify(value),
  );
};
export const getItem = async (key) => {
 return await AsyncStorageStatic.getItem(key)
};