import { useState } from 'react';
import useRootStack from "../../../navigation/useRootStack";

interface ErasData {}
interface ErasActions {}

export interface ErasViewModel extends ErasData, ErasActions {}

const useErasViewModel = (
  navigate: ReturnType<typeof useRootStack>,
): ErasViewModel => {
  return {};
};

export default useErasViewModel;
