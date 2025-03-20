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
      <h1>Collection</h1>
      <div className={styles.mainContent}>
        <div className={styles.movieFormBody}>
          <div className={styles.movieFormBodyContainer}>
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
