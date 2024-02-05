import AsyncStorage from '@react-native-async-storage/async-storage';

const currentUser = async () => {
  try {
    const userDataString = await AsyncStorage.getItem('currentUser');
    const userData = JSON.parse(userDataString);
    return userData;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

export { currentUser };