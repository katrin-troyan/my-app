import { useState } from 'react';
import { View } from 'react-native';
import Header from '../../common/components/Header';
import DrawerContent from '../../common/components/DrawerContent';
import TabBarStack from '../TabBarStack';

export default function DrawerStack() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Header
        onToggleDrawer={() => setIsDrawerOpen(prev => !prev)}
        isOpenDrawer={isDrawerOpen}
      />
      <TabBarStack />
      {isDrawerOpen && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        >
          <DrawerContent onClose={() => setIsDrawerOpen(false)} />
        </View>
      )}
    </View>
  );
}
