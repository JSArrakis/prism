import { FC, useState } from "react";
import styles from "./SavedCollectionItem.module.css";

interface SavedCollectionItemProps {
  collectionRef: PrismCurationReference;
}

const SavedCollectionItem: FC<SavedCollectionItemProps> = ({
  collectionRef,
}) => {
  return (
    <div className={styles.savedCollectionListItem}>
      <div className={styles.savedCollectionName}>{collectionRef.title}</div>
      <div className={styles.savedCollectioneditable}>
        <div className={styles.sequenceNumber}>SEQ #</div>
        <div className={styles.sequenceNumberValue}>
          {collectionRef.sequence}
        </div>
      </div>
    </div>
  );
};

export default SavedCollectionItem;
