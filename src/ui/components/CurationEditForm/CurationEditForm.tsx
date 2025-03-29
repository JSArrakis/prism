import { FC, useState, useRef, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import styles from "./CurationEditForm.module.css";
import MediaItem from "./MediaItem/MediaItem";
import AddedMediaItem from "./AddedMediaItem/AddedMediaItem";

interface CurationEditFormProps {
  curationItem: PrismCurationObj;
  mediaList: PrismMediaItem[];
  formType: string;
  itemType: string;
  onCancel: (item: PrismCurationObj) => void;
  onAdd: (item: PrismMediaItem) => void;
  onRemove: (item: PrismCurationItem) => void;
  onUpdateSequence: (item: PrismCurationItem, sequence: number | null) => void;
  onSave: () => void;
}

const CurationEditForm: FC<CurationEditFormProps> = ({
  curationItem,
  formType,
  itemType,
  mediaList,
  onCancel,
  onAdd,
  onRemove,
  onUpdateSequence,
  onSave,
}) => {
  const [mediaListSearchTerm, setMediaListSearchTerm] = useState("");
  const searchMediaRef = useRef<HTMLInputElement>(null);
  const [filteredMediaList, setFilteredMediaList] =
    useState<PrismMediaItem[]>(mediaList);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningModalMessage, setWarningModalMessage] = useState("");
  const [currentItem, setCurrentItem] = useState<PrismCurationObj | null>(
    curationItem
  );

  useEffect(() => {
    setFilteredMediaList(mediaList);
    setMediaListSearchTerm("");
  }, [mediaList]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.add(styles.hidePlaceholder);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.remove(styles.hidePlaceholder);
  };

  const searchMedia = (searchTerm: string) => {
    const filteredList = mediaList.filter(
      (mediaItem) =>
        mediaItem.title && mediaItem.title.toLowerCase().includes(searchTerm)
    );
    setFilteredMediaList(filteredList);
  };

  const handleSave = () => {
    const itemsWithoutSequence = curationItem.items.filter(
      (item) =>
        Number.isNaN(item.sequence) ||
        item.sequence === null ||
        item.sequence === undefined
    );
    const itemsWithDuplicateSequence = curationItem.items.filter(
      (item, index, self) =>
        self.findIndex((t) => t.sequence === item.sequence) !== index
    );
    if (itemsWithoutSequence.length > 0) {
      setWarningModalMessage(
        "Some items are missing a sequence. Please add sequences before saving."
      );
      setShowWarningModal(true);
      setTimeout(() => setShowWarningModal(false), 2000);
      return;
    } else if (itemsWithDuplicateSequence.length > 0) {
      setWarningModalMessage(
        "Some items have duplicate sequences. Please update sequences before saving."
      );
      setShowWarningModal(true);
      setTimeout(() => setShowWarningModal(false), 2000);
      return;
    } else {
      onSave();
    }
  };

  const debounceSearchMedia = useDebounce(searchMedia, 300);

  useEffect(() => {
    debounceSearchMedia(mediaListSearchTerm.toLowerCase());
  }, [mediaListSearchTerm, debounceSearchMedia]);

  return (
    <div className={styles.curationEditContainer}>
      {showWarningModal && (
        <div className={styles.warningModal}>{warningModalMessage}</div>
      )}
      <div className={styles.editModalHeader}>
        <div></div>
        <div className={styles.editModalCardTitle}>
          EDIT {formType.toUpperCase()} MEDIA
        </div>
        <div
          className={styles.closeEdit}
          onClick={() => onCancel(curationItem)}
        >
          <span className="material-symbols-rounded">close</span>
        </div>
      </div>
      <div className={styles.curationMedia}>
        {curationItem.items.map((mediaItem) => (
          <AddedMediaItem
            key={mediaItem.mediaItemId}
            item={mediaItem}
            onRemove={onRemove}
            onUpdateSequence={onUpdateSequence}
          />
        ))}
      </div>
      <div className={styles.controlsRow}>
        <input
          className={styles.itemSearch}
          type="text"
          placeholder={`SEARCH ${itemType.toUpperCase()}`}
          value={mediaListSearchTerm}
          onChange={(e) => setMediaListSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={searchMediaRef}
        />
        <div className={styles.simpleButton} onClick={() => handleSave()}>
          SAVE
        </div>
      </div>
      <div className={styles.candidateMedia}>
        {filteredMediaList.map((mediaItem) => (
          <MediaItem
            key={mediaItem.mediaItemId}
            item={mediaItem}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  );
};

export default CurationEditForm;
