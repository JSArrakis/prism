import { FC } from 'react';
import { HolidaysViewModel } from './Holidays.viewmodel';
import styles from './Holidays.module.css';

interface HolidaysViewProps {
  viewModel: HolidaysViewModel;
}

const HolidaysView: FC<HolidaysViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <div className={styles.screenTitle}>Holidays</div>
      <div className={styles.mainContent}>
        <div className={styles.screenFormBorder}>
          <div className={styles.screenFormBodyContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default HolidaysView;
