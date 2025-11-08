import React, { useEffect } from 'react';

import { DevSettings, View } from 'react-native';
import RootNavigation from './src/navigation';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
// import {firebase} from '@react-native-firebase/firestore';
// import {animals} from './animals_list.js';
function App(): React.JSX.Element {
  // const db = firebase.firestore();
  //
  // const uploadAnimalsToFirestore = async animals => {
  //   const collectionRef = db.collection('animals');
  //
  //   for (const animal of animals) {
  //     await collectionRef
  //       .add(animal)
  //       .then(docRef => {
  //         console.log(`Document written with ID: ${docRef.id}`);
  //       })
  //       .catch(error => {
  //         console.error('Error adding document: ', error);
  //       });
  //   }
  // };
  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Reload App', () => {
        DevSettings.reload();
      });
    }
    //  uploadAnimalsToFirestore(animals);
    SplashScreen.hide();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <RootNavigation />
    </View>
  );
}

export default App;
