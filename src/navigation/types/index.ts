import { ISettings } from '../../screen/FilterSettings';
import { IPets } from '../../screen/Home';

export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};
export type DrawerStackType = {
  TAB_BAR_STACK: undefined;
};
export type LoggedInStackType = {
  DRAWER_STACK: {
    screen: keyof DrawerStackType;
    params?: {
      screen: keyof TabBarStackType;
      params?: { settings: ISettings };
    };
  };
  FILTERS_SETTINGS_PAGE: { petsList: IPets[] };
  HOME_PAGE: { settings: ISettings };
};

export type TabBarStackType = {
  HOME_PAGE: {
    settings: ISettings;
  };
  FAVORITE_PAGE: undefined;
};
export type RootStackNavigation = {
  LOGGED_IN_STACK: { screens?: keyof LoggedInStackType };
  LOGGED_OUT_STACK: { screens?: keyof LoggedOutStackType };
};
