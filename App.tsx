import React from 'react';
import LoginPage from './src/screen/Auth/Login';
import { View } from 'react-native';

function App(): React.JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <LoginPage />
    </View>
  );
}

export default App;
