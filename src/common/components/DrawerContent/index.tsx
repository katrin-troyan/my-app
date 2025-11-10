import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../Header';
import { fonts } from '../../../constants/fonts';
import { ArrowIcon } from '../../../assets/icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../constants/screenNames';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedInStackType } from '../../../navigation/types';

interface DrawerContentProps {
  onClose: () => void;
}

export default function DrawerContent({ onClose }: DrawerContentProps) {
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();
  const navigateToLanguages = () => {
    navigation.navigate(ScreenNames.LANGUAGES_PAGE);
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const navigateToWebPage = () => {
    navigation.navigate(ScreenNames.WEB_PAGE);
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
      <Header isOpenDrawer={true} onToggleDrawer={onClose} />
      <View style={styles.mainWrapper}>
        <TouchableOpacity style={styles.btnWrapper} onPress={navigateToWebPage}>
          <Text style={styles.text}>Наш сайт</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={navigateToLanguages}
        >
          <Text style={styles.text}>Налаштування мови</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper}>
          <Text style={styles.text} onPress={onClose}>
            Вихід
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { marginHorizontal: 10, gap: 16, marginTop: 30 },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts.ComfortaaRegular,
    fontSize: 16,
    color: 'black',
  },
});
