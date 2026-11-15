import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage } from 'zustand/middleware';

/** Shared persistence adapter for zustand stores. */
export const persistStorage = createJSONStorage(() => AsyncStorage);
