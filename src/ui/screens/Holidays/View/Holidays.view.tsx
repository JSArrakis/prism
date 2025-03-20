import { FC } from 'react';
import { HolidaysViewModel } from './Holidays.viewmodel';
import styles from './Holidays.module.css';

interface HolidaysViewProps {
  viewModel: HolidaysViewModel;
}

const HolidaysView: FC<HolidaysViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>Holidays</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default HolidaysView;
