import { FC, useEffect, useState } from "react";
import styles from "./MediaListItem.module.css";
import { DEFAULT_TAG } from "../../../common/constants";

interface MediaListItemProps {
  item: PrismMediaItem;
  onEdit: (item: PrismMediaItem) => void;
  onSave: (item: PrismMediaItem) => void;
  onRemove: (item: PrismMediaItem) => void;
}

const MediaListItem: FC<MediaListItemProps> = ({
  item,
  onEdit,
  onSave,
  onRemove,
}) => {
  const [title, setTitle] = useState(item.title || "");
  const [hasIncomingTitle, setHasIncomingTitle] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (item.title) {
      setTitle(item.title);
      setHasIncomingTitle(true);
    }
  }, [item.title]);

  const getFileName = (path: string) => {
    const parts = path.split("\\");
    return parts[parts.length - 1];
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleSave = () => {
    if (!title.trim()) {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 1000);
      return;
    }

    const tags: string[] = [DEFAULT_TAG];
    onSave({ ...item, title, tags });
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
            className={`${styles.titleInput} ${
              isFlashing ? styles.flashRed : ""
            }`}
          />
        )}
        <div className={styles.itemPathContainer}>
          <div></div>
          <div className={styles.itemPath}>{getFileName(item.path)}</div>
        </div>
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

export default MediaListItem;
