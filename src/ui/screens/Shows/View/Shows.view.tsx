import { FC } from 'react';
import { ShowsViewModel } from './Shows.viewmodel';
import styles from './Shows.module.css';

interface ShowsViewProps {
  viewModel: ShowsViewModel;
}

const ShowsView: FC<ShowsViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <div className={styles.screenTitle}>Shows</div>
      <div className={styles.mainContent}>
        <div className={styles.screenFormBorder}>
          <div className={styles.screenFormBodyContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default ShowsView;
