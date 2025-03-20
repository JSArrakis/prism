import { FC } from 'react';
import { MosaicViewModel } from './Mosaic.viewmodel';
import styles from './Mosaic.module.css';

interface MosaicViewProps {
  viewModel: MosaicViewModel;
}

const MosaicView: FC<MosaicViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>Mosaic</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default MosaicView;
