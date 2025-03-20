import { FC } from 'react';
import { AgeGroupsViewModel } from './AgeGroups.viewmodel';
import styles from './AgeGroups.module.css';

interface AgeGroupsViewProps {
  viewModel: AgeGroupsViewModel;
}

const AgeGroupsView: FC<AgeGroupsViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>AgeGroups</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default AgeGroupsView;
