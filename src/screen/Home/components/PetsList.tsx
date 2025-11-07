import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import { IPets } from '../index';
import { fonts } from '../../../constants/fonts';
import { FavoriteIcon } from '../../../assets/icons';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoggedInStackType } from '../../../navigation/types';
import { ScreenNames } from '../../../constants/screenNames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState } from 'react';

export const handleAddToFavorite = async (pet: IPets) => {
  try {
    const storage = await AsyncStorage.getItem('favorites');
    const list: IPets[] =
      storage && Array.isArray(JSON.parse(storage)) ? JSON.parse(storage) : [];

    const exists = list.find(e => e.timeStamp === pet.timeStamp);

    let updated;

    if (exists) {
      updated = list.filter(e => e.timeStamp !== pet.timeStamp);
    } else {
      updated = [...list, pet];
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.log('e', e);
  }
};

export default function PetsList({ pets }: { pets: IPets[] }) {
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();
  const [favorites, setFavorites] = useState<IPets[]>([]);

  const getFavorite = async () => {
    try {
      const storage = await AsyncStorage.getItem('favorites');
      const list: IPets[] =
        storage && Array.isArray(JSON.parse(storage))
          ? JSON.parse(storage)
          : [];

      setFavorites(list);
    } catch (e) {
      console.log('e', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void getFavorite();
    }, []),
  );

  const onFavorite = async (item: IPets) => {
    const updated = await handleAddToFavorite(item);
    if (updated) setFavorites(updated);
  };

  const handleGoToPet = (item: IPets) => {
    navigation.navigate(ScreenNames.PET_PAGE, { pet: item });
  };

  return (
    <View style={styles.flex}>
      <FlatList
        data={pets}
        numColumns={2}
        style={styles.mainContainer}
        keyExtractor={item => item.timeStamp.toString()}
        renderItem={({ item }) => {
          const isFavorite = !!favorites.find(
            e => e.timeStamp === item.timeStamp,
          );

          return (
            <View style={styles.item}>
              <Pressable onPress={() => handleGoToPet(item)}>
                <ImageBackground
                  source={{ uri: item.images?.[0] }}
                  imageStyle={{ borderRadius: 20 }}
                  style={styles.image}
                  resizeMode={'cover'}
                >
                  {/* FAVORITE BTN */}
                  <Pressable
                    style={styles.favoriteBtn}
                    onPress={() => onFavorite(item)}
                  >
                    <FavoriteIcon isFavorite={isFavorite} />
                  </Pressable>

                  {/* TEXT BLOCK */}
                  <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.type}</Text>
                    <Text style={styles.text}>{item.age} years</Text>
                  </View>
                </ImageBackground>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  mainContainer: {
    width: '100%',
    marginHorizontal: 10,
  },
  item: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 30,
    margin: 10,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  textContainer: { margin: 15 },
  text: {
    color: 'white',
    fontFamily: fonts.MontserratBold,
  },
  favoriteBtn: {
    alignSelf: 'flex-end',
    margin: 10,
    zIndex: 10,
  },
});
