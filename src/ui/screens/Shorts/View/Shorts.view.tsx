import { FC } from 'react';
import { ShortsViewModel } from './Shorts.viewmodel';
import styles from './Shorts.module.css';

interface ShortsViewProps {
  viewModel: ShortsViewModel;
}

const ShortsView: FC<ShortsViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <div className={styles.screenTitle}>Shorts</div>
      <div className={styles.mainContent}>
        <div className={styles.screenFormBorder}>
          <div className={styles.screenFormBodyContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default ShortsView;
