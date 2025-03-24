import React, { FC, useState } from "react";
import styles from "./CollectionListItem.module.css";

interface CollectionListItemProps {
  collection: PrismCurationObj;
  onSave: (id: string, sequence: number) => void;
}

const CollectionListItem: FC<CollectionListItemProps> = ({
  collection,
  onSave,
}) => {
  const [collectionSequence, setCollectionSequence] = useState<number | null>(
    null
  );

  const handleCollectionItemSave =
    (id: string, sequence: number | null) => () => {
      if (sequence !== null) {
        // check if the sequence number is already used
        // find item in collection that has the sequence number
        const item = collection.items.find(
          (item) => item.sequence === sequence
        );
        if (item) {
          // display error modal
        } else {
          onSave(id, sequence);
        }
      }
    };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.add(styles.hidePlaceholder);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.remove(styles.hidePlaceholder);
  };

  return (
    <div className={styles.collectionListItem}>
      <div className={styles.collectionName}>{collection.title}</div>
      <div className={styles.collectioneditable}>
        <div className={styles.sequenceNumber}>SEQ #</div>
        <input
          className={styles.sequenceInput}
          type="text"
          placeholder="0"
          value={collectionSequence !== null ? collectionSequence : ""}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || /^[0-9]{1,3}$/.test(value)) {
              setCollectionSequence(value === "" ? null : Number(value));
            }
          }}
          maxLength={3}
          max={999}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div
          className={styles.saveCollectionRowButton}
          onClick={handleCollectionItemSave(
            collection.mediaItemId,
            collectionSequence
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#e8eaed"
          >
            <path d="M816-672v456q0 29.7-21.15 50.85Q773.7-144 744-144H216q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-29.7 21.15-50.85Q186.3-816 216-816h456l144 144Zm-72 30L642-744H216v528h528v-426ZM480-252q45 0 76.5-31.5T588-360q0-45-31.5-76.5T480-468q-45 0-76.5 31.5T372-360q0 45 31.5 76.5T480-252ZM264-552h336v-144H264v144Zm-48-77v413-528 115Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CollectionListItem;
