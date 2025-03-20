import { FC, useEffect, useState } from "react";
import styles from "./CurationItem.module.css";

interface CurationItemProps {
  item: PrismCurationObj;
  onEdit: (item: PrismCurationObj) => void;
  onSave: (item: PrismCurationObj) => void;
  onRemove: (item: PrismCurationObj) => void;
}

const CurationItem: FC<CurationItemProps> = ({
  item,
  onEdit,
  onSave,
  onRemove,
}) => {
  const [title, setTitle] = useState(item.title || "");
  const [hasIncomingTitle, setHasIncomingTitle] = useState(!!item.title);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  useEffect(() => {
    if (item.title) {
      setTitle(item.title);
      setHasIncomingTitle(true);
    }
  }, [item.title]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleSave = () => {
    const mediaItemId = title.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    onSave({ ...item, title, mediaItemId });
  };

  const handleUndo = () => {
    setShowRemoveConfirm(false);
  };

  return (
    <div className={styles.mediaItem}>
      <div className={styles.removeRow}>
        {showRemoveConfirm ? (
          <div className={styles.undoRemove} onClick={() => handleUndo()}>
            <span className="material-symbols-rounded">undo</span>
          </div>
        ) : (
          <div
            className={styles.closeRow}
            onClick={() =>
              hasIncomingTitle ? setShowRemoveConfirm(true) : onRemove(item)
            }
          >
            <span className="material-symbols-rounded">close</span>
          </div>
        )}
        {showRemoveConfirm && (
          <div className={styles.confirmRemove} onClick={() => onRemove(item)}>
            <span className="material-symbols-rounded">close</span>
          </div>
        )}
      </div>
      <div className={styles.itemContent}>
        {hasIncomingTitle ? (
          <div className={styles.itemTitle}>{title}</div>
        ) : (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="ENTER TITLE"
            className={styles.titleInput}
          />
        )}
      </div>
      <div className={styles.actionsRow}>
        {!hasIncomingTitle && (
          <div className={styles.saveRow} onClick={handleTitleSave}>
            <span className="material-symbols-rounded">save</span>
          </div>
        )}
        <div className={styles.editRow} onClick={() => onEdit(item)}>
          <span className="material-symbols-rounded">edit_square</span>
        </div>
      </div>
    </div>
  );
};

export default CurationItem;
