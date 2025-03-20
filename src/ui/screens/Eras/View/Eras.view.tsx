import { FC } from 'react';
import { ErasViewModel } from './Eras.viewmodel';
import styles from './Eras.module.css';

interface ErasViewProps {
  viewModel: ErasViewModel;
}

const ErasView: FC<ErasViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>Eras</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default ErasView;
