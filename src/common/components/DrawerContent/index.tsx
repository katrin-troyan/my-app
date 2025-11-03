import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../Header';
import { fonts } from '../../../constants/fonts';
import { ArrowIcon } from '../../../assets/icons';

interface DrawerContentProps {
  onClose: () => void;
}

export default function DrawerContent({ onClose }: DrawerContentProps) {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
      <Header isOpenDrawer={true} onToggleDrawer={onClose} />
      <View style={styles.mainWrapper}>
        <TouchableOpacity style={styles.btnWrapper}>
          <Text style={styles.text}>Наш сайт</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper}>
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
