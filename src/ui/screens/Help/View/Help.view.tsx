import { FC } from 'react';
import { HelpViewModel } from './Help.viewmodel';
import styles from './Help.module.css';

interface HelpViewProps {
  viewModel: HelpViewModel;
}

const HelpView: FC<HelpViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>Help</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default HelpView;
