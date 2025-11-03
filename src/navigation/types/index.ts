export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};
export type DrawerStackType = {
  TAB_BAR_STACK: undefined;
};
export type LoggedInStackType = {
  DRAWER_STACK: undefined;
};
export type TabBarStackType = {
  HOME_PAGE: undefined;
  FAVORITE_PAGE: undefined;
};
export type RootStackNavigation = {
  LOGGED_IN_STACK: { screens?: keyof LoggedInStackType };
  LOGGED_OUT_STACK: { screens?: keyof LoggedOutStackType };
};
