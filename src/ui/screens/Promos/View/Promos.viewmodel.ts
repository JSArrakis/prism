import { useState } from 'react';
import useRootStack from "../../../navigation/useRootStack";

interface PromosData {}
interface PromosActions {}

export interface PromosViewModel extends PromosData, PromosActions {}

const usePromosViewModel = (
  navigate: ReturnType<typeof useRootStack>,
): PromosViewModel => {
  return {};
};

export default usePromosViewModel;
