import { FC } from "react";
import { CollectionsViewModel } from "./Collections.viewmodel";
import styles from "./Collections.module.css";
import CurationItemList from "../../../components/CurationItemList/CurationItemList";

interface CollectionsViewProps {
  viewModel: CollectionsViewModel;
}

const CollectionsView: FC<CollectionsViewProps> = ({ viewModel }) => {
  return (
    <div className={styles.screen}>
      <div className={styles.screenTitle}>Collections</div>
      <div className={styles.mainContent}>
        <div className={styles.screenFormBorder}>
          <div className={styles.screenFormBodyContainer}>
            <CurationItemList
              type="collection"
              items={viewModel.collections}
              onEdit={viewModel.onEdit}
              onSave={viewModel.onSave}
              onRemove={viewModel.onRemove}
              isEditModalOpen={viewModel.isEditModalOpen}
              onAddItem={viewModel.addCollection}
              onSearch={viewModel.searchCollections}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsView;
