import { FC } from 'react';
import { CommercialsViewModel } from './Commercials.viewmodel';
import styles from './Commercials.module.css';

interface CommercialsViewProps {
  viewModel: CommercialsViewModel;
}

const CommercialsView: FC<CommercialsViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>Commercials</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default CommercialsView;
