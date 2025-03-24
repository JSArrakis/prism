import { FC, useEffect, useState } from "react";
import styles from "./MediaItemList.module.css";
import MediaListItem from "./MediaListItem/MediaListItem";
import MediaEditForm from "../MediaEditForm/MediaEditForm";
import Modal from "../Modal/Modal";
import useDebounce from "../../hooks/useDebounce";

interface MediaItemListProps {
  items: PrismMediaItem[];
  type: string;
  isEditModalOpen: boolean;
  selectedItem: PrismMediaItem;
  onEdit: (item: PrismMediaItem) => void;
  onSave: (item: PrismMediaItem) => void;
  onRemove: (item: PrismMediaItem) => void;
  onAddItem: () => void;
  onSearch: (searchString: string) => void;
}

const MediaItemList: FC<MediaItemListProps> = ({
  items,
  type,
  isEditModalOpen,
  selectedItem,
  onEdit,
  onSave,
  onRemove,
  onAddItem,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(onSearch, 1000);

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemHeader}>
        <div className={styles.addItem} onClick={onAddItem}>
          <span className="material-symbols-rounded">add</span>
        </div>
        <div className={styles.searchContainer}>
          <div className={styles.searchField}>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="SEARCH TITLE"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* <div className={styles.searchButton}>
            <span className="material-symbols-rounded">search</span>
          </div> */}
        </div>
      </div>
      <div className={styles.mediaList}>
        {items.map((item) => (
          <MediaListItem
            key={item.mediaItemId}
            item={item}
            onEdit={onEdit}
            onSave={onSave}
            onRemove={onRemove}
          />
        ))}
        <Modal
          isOpen={isEditModalOpen}
          fullScreen={false}
          style={{
            padding: "0px",
            maxWidth: "calc(100% - 170px)",
          }}
        >
          <MediaEditForm
            item={selectedItem}
            itemType={type}
            onRemove={onRemove}
            onSave={onSave}
            onCancel={onEdit}
          />
        </Modal>
      </div>
    </div>
  );
};

export default MediaItemList;
