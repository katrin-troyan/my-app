import React, { useEffect } from 'react';

import { DevSettings, View } from 'react-native';
import RootNavigation from './src/navigation';

function App(): React.JSX.Element {
  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Reload App', () => {
        DevSettings.reload();
      });
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <RootNavigation />
    </View>
  );
}

export default App;
