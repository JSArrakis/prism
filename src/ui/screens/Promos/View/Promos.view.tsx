import { FC } from 'react';
import { PromosViewModel } from './Promos.viewmodel';
import styles from './Promos.module.css';

interface PromosViewProps {
  viewModel: PromosViewModel;
}

const PromosView: FC<PromosViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <div className={styles.screenTitle}>Promos</div>
      <div className={styles.mainContent}>
        <div className={styles.screenFormBorder}>
          <div className={styles.screenFormBodyContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default PromosView;
