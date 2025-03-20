import { FC } from 'react';
import { PromosViewModel } from './Promos.viewmodel';
import styles from './Promos.module.css';

interface PromosViewProps {
  viewModel: PromosViewModel;
}

const PromosView: FC<PromosViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>Promos</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default PromosView;
