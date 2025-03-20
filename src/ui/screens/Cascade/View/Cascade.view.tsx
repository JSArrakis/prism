import { FC } from 'react';
import { CascadeViewModel } from './Cascade.viewmodel';
import styles from './Cascade.module.css';

interface CascadeViewProps {
  viewModel: CascadeViewModel;
}

const CascadeView: FC<CascadeViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>Cascade</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default CascadeView;
