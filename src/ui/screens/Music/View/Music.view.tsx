import { FC } from 'react';
import { MusicViewModel } from './Music.viewmodel';
import styles from './Music.module.css';

interface MusicViewProps {
  viewModel: MusicViewModel;
}

const MusicView: FC<MusicViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <div className={styles.screenTitle}>Music Videos</div>
      <div className={styles.mainContent}>
        <div className={styles.screenFormBorder}>
          <div className={styles.screenFormBodyContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default MusicView;
