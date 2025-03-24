import { FC } from 'react';
import { AgeGroupsViewModel } from './AgeGroups.viewmodel';
import styles from './AgeGroups.module.css';

interface AgeGroupsViewProps {
  viewModel: AgeGroupsViewModel;
}

const AgeGroupsView: FC<AgeGroupsViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <div className={styles.screenTitle}>AgeGroups</div>
      <div className={styles.mainContent}>
        <div className={styles.screenFormBorder}>
          <div className={styles.screenFormBodyContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default AgeGroupsView;
