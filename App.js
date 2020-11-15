import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const getWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=`,
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  const getLocation = async () => {
    try {
      // 장소에 관한 허용이 필요함
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      // Send to API and get weahter
      getWeather(latitude, longitude);
      setIsLoading(false);
    } catch (err) {
      Alert.alert(`Can't find you.`, 'check your device');
      console.error(err);
    }
  };
  React.useEffect(() => {
    getLocation();
  }, []);
  return isLoading ? <Loading /> : null;
}
