import { FC } from 'react';
import { SettingsViewModel } from './Settings.viewmodel';
import styles from './Settings.module.css';

interface SettingsViewProps {
  viewModel: SettingsViewModel;
}

const SettingsView: FC<SettingsViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <h1>Settings</h1>
      <p>Content goes here</p>
      <div className={styles.mainContent} />
    </div>
  );
};

export default SettingsView;
