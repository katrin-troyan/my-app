import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import Favorite from '../../screen/Favorite/index';
import { ScreenNames } from '../../constants/screenNames';
import Home from '../../screen/Home';
import { TabBarStackType } from '../types';
import getTabOptions from './options';
import { useCallback } from 'react';

const Tab = createBottomTabNavigator<TabBarStackType>();

export default function TabBarStack() {
  const tabOptions = useCallback(
    (route: RouteProp<TabBarStackType, keyof TabBarStackType>) => {
      return getTabOptions(route);
    },
    [],
  );

  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={({ route }) => ({ ...tabOptions(route) })}
    >
      <Tab.Screen name={ScreenNames.HOME_PAGE} component={Home} />
      <Tab.Screen name={ScreenNames.FAVORITE_PAGE} component={Favorite} />
    </Tab.Navigator>
  );
}
