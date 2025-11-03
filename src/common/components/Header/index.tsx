import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CloseIcon, Label } from '../../../assets/icons';

interface IHeader {
  isOpenDrawer?: boolean;
  onToggleDrawer?: () => void;
}

export default function Header({ isOpenDrawer, onToggleDrawer }: IHeader) {
  return (
    <View style={styles.wrapper}>
      <Label />
      <TouchableOpacity style={styles.burgerBtn} onPress={onToggleDrawer}>
        {isOpenDrawer ? (
          <CloseIcon />
        ) : (
          <>
            <View style={styles.line} />
            <View style={styles.line} />
            <View style={styles.line} />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 60,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  burgerBtn: { height: 20, gap: 5, width: 20 },
  line: { width: '100%', height: 2, backgroundColor: 'black' },
});
