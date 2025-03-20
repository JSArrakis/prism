import { useState } from 'react';
import useRootStack from "../../../navigation/useRootStack";

interface ShortsData {}
interface ShortsActions {}

export interface ShortsViewModel extends ShortsData, ShortsActions {}

const useShortsViewModel = (
  navigate: ReturnType<typeof useRootStack>,
): ShortsViewModel => {
  return {};
};

export default useShortsViewModel;
