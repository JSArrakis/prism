import { FC } from 'react';
import { ShowsViewModel } from './Shows.viewmodel';
import styles from './Shows.module.css';

interface ShowsViewProps {
  viewModel: ShowsViewModel;
}

const ShowsView: FC<ShowsViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>Shows</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default ShowsView;
