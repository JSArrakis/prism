import { FC, useEffect, useState, useCallback } from "react";
import styles from "./CurationItemList.module.css";
import Modal from "../Modal/Modal";
import useDebounce from "../../hooks/useDebounce";
import CurationItem from "./CurationItem/CurationItem";
interface CurationItemListProps {
  items: PrismCurationObj[];
  type: string;
  isEditModalOpen: boolean;
  onAddItem: () => void;
  onSearch: (searchString: string) => void;
  onEdit: (item: PrismCurationObj) => void;
  onSave: (item: PrismCurationObj) => void;
  onRemove: (item: PrismCurationObj) => void;
}

const CurationItemList: FC<CurationItemListProps> = ({
  items,
  type,
  onEdit,
  onSave,
  onRemove,
  isEditModalOpen,
  onAddItem,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(onSearch, 1000);

  const handleSearch = useCallback(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, handleSearch]);

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
          <CurationItem
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
            maxWidth: "calc(100% - 40px)",
          }}
        >
          <div>Modal</div>
          {/* <SimpleMediaEditForm
            item={selectedItem}
            itemType={type}
            tags={tags}
            onDelete={onDelete}
            onSave={onSave}
            onCancel={onEdit}
            collections={collections}
          /> */}
        </Modal>
      </div>
    </div>
  );
};

export default CurationItemList;
