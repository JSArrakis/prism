import { useState } from 'react';
import useRootStack from "../../../navigation/useRootStack";

interface GenresData {}
interface GenresActions {}

export interface GenresViewModel extends GenresData, GenresActions {}

const useGenresViewModel = (
  navigate: ReturnType<typeof useRootStack>,
): GenresViewModel => {
  return {};
};

export default useGenresViewModel;
