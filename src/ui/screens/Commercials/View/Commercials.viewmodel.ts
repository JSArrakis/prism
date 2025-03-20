import { useState } from 'react';
import useRootStack from '../../../navigation/useRootStack';

interface CommercialsData {}
interface CommercialsActions {}

export interface CommercialsViewModel
  extends CommercialsData,
    CommercialsActions {}

const useCommercialsViewModel = (
  navigate: ReturnType<typeof useRootStack>,
): CommercialsViewModel => {
  return {};
};

export default useCommercialsViewModel;
