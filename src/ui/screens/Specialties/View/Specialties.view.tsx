import { FC } from 'react';
import { SpecialtiesViewModel } from './Specialties.viewmodel';
import styles from './Specialties.module.css';

interface SpecialtiesViewProps {
  viewModel: SpecialtiesViewModel;
}

const SpecialtiesView: FC<SpecialtiesViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>Specialties</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default SpecialtiesView;
