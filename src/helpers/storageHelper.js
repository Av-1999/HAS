import AsyncStorageStatic from "@react-native-async-storage/async-storage";

export const setItem = async (key, value) => {
  await AsyncStorageStatic.setItem(
    key,
    JSON.stringify(value),
  );
};

export const getItem = async (key) => {
 return await AsyncStorageStatic.getItem(key)
};

export const removeItem = async (key) => {
  await AsyncStorageStatic.removeItem(key);
};