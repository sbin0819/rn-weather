import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';

// export default class extends React.Component {
//   getLocation = async () => {
//     const location = await Location.getCurrentPositionAsync();
//     console.log(location);
//   };
//   componentDidMount() {
//     this.getLocation();
//   }
//   render() {
//     return <Loading />;
//   }
// }

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const getLocation = async () => {
    try {
      // 장소에 관한 허용이 필요함
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      // Send to API and get weahter
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
