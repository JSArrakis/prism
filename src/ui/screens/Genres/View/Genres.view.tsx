import { FC } from 'react';
import { GenresViewModel } from './Genres.viewmodel';
import styles from './Genres.module.css';

interface GenresViewProps {
  viewModel: GenresViewModel;
}

const GenresView: FC<GenresViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>Genres</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default GenresView;
