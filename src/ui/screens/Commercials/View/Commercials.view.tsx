import { FC } from 'react';
import { CommercialsViewModel } from './Commercials.viewmodel';
import styles from './Commercials.module.css';

interface CommercialsViewProps {
  viewModel: CommercialsViewModel;
}

const CommercialsView: FC<CommercialsViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <div className={styles.screenTitle}>Commercials</div>
      <div className={styles.mainContent}>
        <div className={styles.screenFormBorder}>
          <div className={styles.screenFormBodyContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default CommercialsView;
