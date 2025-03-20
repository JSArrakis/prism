import { useState } from 'react';
import useRootStack from "../../../navigation/useRootStack";

interface HolidaysData {}
interface HolidaysActions {}

export interface HolidaysViewModel extends HolidaysData, HolidaysActions {}

const useHolidaysViewModel = (
  navigate: ReturnType<typeof useRootStack>,
): HolidaysViewModel => {
  return {};
};

export default useHolidaysViewModel;
