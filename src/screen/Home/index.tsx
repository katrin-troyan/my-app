import { ActivityIndicator, View } from 'react-native';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
  startAt,
  endAt,
} from '@react-native-firebase/firestore';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import PetsList from './components/PetsList';
import SearchBar from './components/SearchBar';
import { ISettings } from '../FilterSettings';
import { RouteProp, useRoute } from '@react-navigation/core';

export interface IPets {
  id: string;
  age: number;
  color: string;
  description: string;
  images: string[];
  isDog: boolean;
  isVaccinated: boolean;
  location: string;
  name: string;
  sex: string;
  type: string;
  timeStamp: number;
  size: 'big' | 'medium' | 'small';
}

export default function Home() {
  const [pets, setPets] = useState<IPets[]>([]);
  const route = useRoute<RouteProp<{ params: { settings: ISettings } }>>();

  const db = getFirestore();
  const animalsRef = collection(db, 'animals');

  const handleSearchWithSettings = useCallback(
    async (settings: ISettings) => {
      try {
        let q: any = query(animalsRef);

        Object.entries(settings ?? {}).forEach(([key, value]) => {
          if (key !== 'timeStamp' && value !== null) {
            q = query(q, where(key, '==', key === 'age' ? +value : value));
          }
        });

        q = query(q, orderBy('timeStamp', settings.timeStamp ? 'desc' : 'asc'));

        const result = await getDocs(q);
        const temp: IPets[] = result.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => ({
            id: doc.id,
            ...(doc.data() as Omit<IPets, 'id'>),
          }),
        );
        setPets(temp);
      } catch (e) {
        console.log('e', e);
      }
    },
    [animalsRef],
  );

  const handleSearch = async (text: string) => {
    try {
      const q = query(
        animalsRef,
        orderBy('name'),
        startAt(text),
        endAt(text + '\uf8ff'),
      );

      const result = await getDocs(q);
      const temp: IPets[] = result.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          ...(doc.data() as Omit<IPets, 'id'>),
        }),
      );

      setPets(temp);
    } catch (e) {
      console.log('e', e);
    }
  };

  useEffect(() => {
    handleSearchWithSettings(route?.params?.settings ?? {});
  }, [route?.params?.settings, handleSearchWithSettings]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar handleSearch={handleSearch} pets={pets} />
      {pets.length ? <PetsList pets={pets} /> : <ActivityIndicator />}
    </View>
  );
}
