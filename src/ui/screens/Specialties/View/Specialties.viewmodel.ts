import { useState } from 'react';
import useRootStack from "../../../navigation/useRootStack";

interface SpecialtiesData {}
interface SpecialtiesActions {}

export interface SpecialtiesViewModel
  extends SpecialtiesData,
    SpecialtiesActions {}

const useSpecialtiesViewModel = (
  navigate: ReturnType<typeof useRootStack>,
): SpecialtiesViewModel => {
  return {};
};

export default useSpecialtiesViewModel;
