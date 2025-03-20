import { FC, useState } from "react";
import styles from "./SavedCollectionItem.module.css";

interface SavedCollectionItemProps {
  collectionRef: PrismCurationReference;
  onSave: (id: string, sequence: number | null) => void;
}

const SavedCollectionItem: FC<SavedCollectionItemProps> = ({
  collectionRef,
  onSave,
}) => {
  const [collectionSequence, setCollectionSequence] = useState<number | null>(
    collectionRef.sequence
  );
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const handleToggleEdit = () => {
    setToggleEdit(true);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.add(styles.hidePlaceholder);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.remove(styles.hidePlaceholder);
  };

  return (
    <div className={styles.savedCollectionListItem}>
      {!toggleEdit ? (
        <div className={styles.removeCollectionRowButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#e8eaed"
          >
            <path d="m291-240-51-51 189-189-189-189 51-51 189 189 189-189 51 51-189 189 189 189-51 51-189-189-189 189Z" />
          </svg>
        </div>
      ) : (
        <></>
      )}
      <div></div>
      <div className={styles.savedCollectionName}>{collectionRef.title}</div>
      <div className={styles.savedCollectioneditable}>
        <div className={styles.sequenceNumber}>SEQ #</div>
        {toggleEdit ? (
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
        ) : (
          <div className={styles.sequenceNumberValue}>
            {collectionRef.sequence}
          </div>
        )}
        {toggleEdit ? (
          <div
            className={styles.saveCollectionRowButton}
            onClick={() =>
              onSave(collectionRef.curationRefId, collectionSequence)
            }
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
        ) : (
          <div
            className={styles.editCollectionRowButton}
            onClick={handleToggleEdit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#e8eaed"
            >
              <path d="M216-144q-29.7 0-50.85-21.15Q144-186.3 144-216v-528q0-30.11 21-51.56Q186-817 216-816h346l-72 72H216v528h528v-274l72-72v346q0 29.7-21.15 50.85Q773.7-144 744-144H216Zm264-336Zm-96 96v-153l354-354q11-11 24-16t26.5-5q14.4 0 27.45 5 13.05 5 23.99 15.78L891-840q11 11 16 24.18t5 26.82q0 13.66-5.02 26.87-5.02 13.2-15.98 24.13L537-384H384Zm456-405-51-51 51 51ZM456-456h51l231-231-25-26-26-25-231 231v51Zm257-257-26-25 26 25 25 26-25-26Z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedCollectionItem;
