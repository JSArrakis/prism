import { FC } from 'react';
import { MusicViewModel } from './Music.viewmodel';
import styles from './Music.module.css';

interface MusicViewProps {
  viewModel: MusicViewModel;
}

const MusicView: FC<MusicViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>Music</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default MusicView;
