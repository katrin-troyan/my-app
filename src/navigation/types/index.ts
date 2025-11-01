export type LoggedOutStackType = {
  LOGIN_PAGE: undefined;
  REGISTRATION_PAGE: undefined;
};
export type LoggedInStackType = {
  HOME_PAGE: undefined;
};

export type RootStackNavigation = {
  LOGGED_IN_STACK: { screens?: keyof LoggedInStackType };
  LOGGED_OUT_STACK: { screens?: keyof LoggedOutStackType };
};
