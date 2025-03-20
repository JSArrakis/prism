import { FC } from 'react';
import { ShortsViewModel } from './Shorts.viewmodel';
import styles from './Shorts.module.css';

interface ShortsViewProps {
  viewModel: ShortsViewModel;
}

const ShortsView: FC<ShortsViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>Shorts</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default ShortsView;
