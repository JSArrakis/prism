import { useState } from 'react';
import useRootStack from '../../../navigation/useRootStack';

interface AgeGroupsData {}
interface AgeGroupsActions {}

export interface AgeGroupsViewModel extends AgeGroupsData, AgeGroupsActions {}

const useAgeGroupsViewModel = (
  navigate: ReturnType<typeof useRootStack>,
): AgeGroupsViewModel => {
  return {};
};

export default useAgeGroupsViewModel;
