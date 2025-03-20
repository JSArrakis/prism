import { useState } from 'react';
import useRootStack from "../../../navigation/useRootStack";

interface ShowsData {}
interface ShowsActions {}

export interface ShowsViewModel extends ShowsData, ShowsActions {}

const useShowsViewModel = (
  navigate: ReturnType<typeof useRootStack>,
): ShowsViewModel => {
  return {};
};

export default useShowsViewModel;
