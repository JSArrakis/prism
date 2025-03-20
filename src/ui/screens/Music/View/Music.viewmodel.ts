import { useState } from 'react';
import useRootStack from '../../../navigation/useRootStack';

interface MusicData {}
interface MusicActions {}

export interface MusicViewModel extends MusicData, MusicActions {}

const useMusicViewModel = (
  navigate: ReturnType<typeof useRootStack>,
): MusicViewModel => {
  return {};
};

export default useMusicViewModel;
