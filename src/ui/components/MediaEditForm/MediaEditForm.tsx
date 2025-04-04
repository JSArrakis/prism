import { FC, useState, useRef, useEffect } from "react";
import styles from "./MediaEditForm.module.css";
import { getFileName } from "../../common/helpers";
import { TAG_CATEGORIES } from "../../common/constants";
import SavedCollectionItem from "./SavedCollectionItem/SavedCollectionItem";
import { useGetAllAestheticTags } from "../../services/tags/useAestheticTags";
import { useGetAllEraTags } from "../../services/tags/useEraTags";
import { useGetAllGenreTags } from "../../services/tags/useGenreTags";
import { useGetAllSpecialtyTags } from "../../services/tags/useSpecialtyTags";

interface MediaEditFormProps {
  item: PrismMediaItem;
  itemType: string;
  onSave: (item: PrismMediaItem) => void;
  onRemove: (item: PrismMediaItem) => void;
  onCancel: (item: PrismMediaItem) => void;
}

const MediaEditForm: FC<MediaEditFormProps> = ({
  item,
  itemType,
  onSave,
  onRemove,
  onCancel,
}) => {
  // #region tags
  const $getAllAestheticTags = useGetAllAestheticTags();
  const $getAllEraTags = useGetAllEraTags();
  const $getAllGenreTags = useGetAllGenreTags();
  const $getAllSpecialtyTags = useGetAllSpecialtyTags();
  const [aestheticTags, setAestheticTags] = useState<Tag[]>([]);
  const [ageGroupTags, setAgeGroupTags] = useState<Tag[]>([]);
  const [eraTags, setEraTags] = useState<Tag[]>([]);
  const [genreTags, setGenreTags] = useState<Tag[]>([]);
  const [holidayTags, setHolidayTags] = useState<Tag[]>([]);
  const [specialtyTags, setSpecialtyTags] = useState<Tag[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);

  useEffect(() => {
    if ($getAllAestheticTags.data) {
      setAestheticTags($getAllAestheticTags.data);
    }
  }, [$getAllAestheticTags.data]);

  useEffect(() => {
    if ($getAllEraTags.data) {
      setEraTags($getAllEraTags.data);
    }
  }, [$getAllEraTags.data]);

  useEffect(() => {
    if ($getAllGenreTags.data) {
      setGenreTags($getAllGenreTags.data);
    }
  }, [$getAllGenreTags.data]);

  useEffect(() => {
    if ($getAllSpecialtyTags.data) {
      setSpecialtyTags($getAllSpecialtyTags.data);
    }
  }, [$getAllSpecialtyTags.data]);

  useEffect(() => {
    setAllTags([
      ...genreTags,
      ...aestheticTags,
      ...specialtyTags,
      ...ageGroupTags,
      ...eraTags,
      ...holidayTags,
    ]);
  }, [
    aestheticTags,
    ageGroupTags,
    eraTags,
    genreTags,
    holidayTags,
    specialtyTags,
  ]);

  // #endregion

  const [tagListSearchTerm, setTagListSearchTerm] = useState("");
  const [currentSelectedTagList, setCurrentSelectedTagList] = useState<
    string[]
  >([]);
  const [isFlashing, setIsFlashing] = useState(false);
  const [currentSelectedCategory, setCurrentSelectedCategory] =
    useState<string>(TAG_CATEGORIES.ALL);
  const [tagChipList, setTagChipList] = useState<string[]>([]);
  const [selectedTagList, setSelectedTagList] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    TAG_CATEGORIES.ALL
  );
  const [title, setTitle] = useState(item.title || "");
  const [alias, setAlias] = useState(item.alias || "");
  const [imdb, setImdb] = useState(item.imdb || "");
  const tagListRef = useRef<HTMLSelectElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const aliasRef = useRef<HTMLInputElement>(null);
  const imdbRef = useRef<HTMLInputElement>(null);
  const searchTagsRef = useRef<HTMLInputElement>(null);
  const collectionListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tagListSearchTerm.trim() === "") {
      setSelectedTagList(currentSelectedTagList);
      setSelectedCategory(currentSelectedCategory);
      return;
    }

    const debouncedSearch = setTimeout(() => {
      setSelectedCategory(TAG_CATEGORIES.ALL);
      const searchTerm = tagListSearchTerm.toLowerCase();
      const filteredList = allTags
        .filter(
          (item) => item.name && item.name.toLowerCase().includes(searchTerm)
        )
        .map((tag) => tag.name);
      setSelectedTagList(filteredList);
    }, 600);

    return () => clearTimeout(debouncedSearch);
  }, [tagListSearchTerm, allTags]);

  useEffect(() => {
    switch (selectedCategory) {
      case TAG_CATEGORIES.AGE_GROUP:
        setSelectedTagList(ageGroupTags.map((tag) => tag.name));
        setCurrentSelectedTagList(ageGroupTags.map((tag) => tag.name));
        setCurrentSelectedCategory(TAG_CATEGORIES.AGE_GROUP);
        break;
      case TAG_CATEGORIES.GENRE:
        setSelectedTagList(genreTags.map((tag) => tag.name));
        setCurrentSelectedTagList(genreTags.map((tag) => tag.name));
        setCurrentSelectedCategory(TAG_CATEGORIES.GENRE);
        break;
      case TAG_CATEGORIES.AESTHETIC:
        setSelectedTagList(aestheticTags.map((tag) => tag.name));
        setCurrentSelectedTagList(aestheticTags.map((tag) => tag.name));
        setCurrentSelectedCategory(TAG_CATEGORIES.AESTHETIC);
        break;
      case TAG_CATEGORIES.SPECIALTY:
        setSelectedTagList(specialtyTags.map((tag) => tag.name));
        setCurrentSelectedTagList(specialtyTags.map((tag) => tag.name));
        setCurrentSelectedCategory(TAG_CATEGORIES.SPECIALTY);
        break;
      case TAG_CATEGORIES.ERA:
        setSelectedTagList(eraTags.map((tag) => tag.name));
        setCurrentSelectedTagList(eraTags.map((tag) => tag.name));
        setCurrentSelectedCategory(TAG_CATEGORIES.ERA);
        break;
      case TAG_CATEGORIES.HOLIDAY:
        setSelectedTagList(holidayTags.map((tag) => tag.name));
        setCurrentSelectedTagList(holidayTags.map((tag) => tag.name));
        setCurrentSelectedCategory(TAG_CATEGORIES.HOLIDAY);
        break;
      default:
        setSelectedTagList(allTags.map((tag) => tag.name));
        setCurrentSelectedTagList(allTags.map((tag) => tag.name));
        setCurrentSelectedCategory(TAG_CATEGORIES.ALL);
        break;
    }
  }, [
    selectedCategory,
    allTags,
    ageGroupTags,
    genreTags,
    aestheticTags,
    specialtyTags,
    eraTags,
    holidayTags,
  ]);

  const handleSave = () => {
    if (!title.trim()) {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 1000);
      return;
    }

    const newTags = tagChipList.length > 0 ? tagChipList : ["Default"];

    const updatedItem: PrismMediaItem = {
      ...item,
      title,
      alias,
      imdb,
      tags: newTags,
    };

    onSave(updatedItem);
  };

  const handleAddChip = () => {
    const selectedTag = tagListRef.current?.value;

    if (selectedTag && !tagChipList.includes(selectedTag)) {
      setTagChipList([...tagChipList, selectedTag]);
    }
    setTagListSearchTerm("");
  };

  const handleRemoveChip = (chip: string) => {
    setTagChipList(tagChipList.filter((item) => item !== chip));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.add(styles.hidePlaceholder);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.remove(styles.hidePlaceholder);
  };

  return (
    <div className={styles.simpleItemEditContainer}>
      <div className={styles.editModalHeader}>
        <div></div>
        <div className={styles.editModalCardTitle}>
          EDIT {itemType.toUpperCase()}
        </div>
        <div className={styles.closeEdit} onClick={() => onCancel(item)}>
          <span className="material-symbols-rounded">close</span>
        </div>
      </div>
      <div className={styles.fileContainer}>
        <div className={styles.fileLabel}>File:</div>
        <div className={styles.fileNameContainer}>
          <div className={styles.fileName}>{getFileName(item.path)}</div>
        </div>
      </div>
      <div className={styles.topBody}>
        <div className={styles.mediaLabels}>
          <div className={styles.editModalTitle}>
            <div className={styles.fileLabel}>TItle:</div>
            <input
              className={`${styles.editInputField} ${
                isFlashing ? styles.flashRed : ""
              }`}
              type="text"
              placeholder="MEDIA TITLE"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={titleRef}
            />
          </div>
          <div className={styles.editModalAlias}>
            <div className={styles.fileLabel}>Alias:</div>
            <input
              className={styles.editInputField}
              type="text"
              placeholder="MEDIA ALIAS"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={aliasRef}
            />
          </div>
          <div className={styles.editModalImdb}>
            <div className={styles.fileLabel}>IMDB:</div>
            <input
              className={styles.editInputField}
              type="text"
              placeholder="IMDB URL"
              value={imdb}
              onChange={(e) => setImdb(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={imdbRef}
            />
          </div>
          <div className={styles.tagListHeader}>
            <div className={styles.tagsLabel}>Tags:</div>
            <select
              className={styles.dropdown}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {Object.values(TAG_CATEGORIES).map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <input
              className={styles.tagListSearchInput}
              type="text"
              placeholder="TAG SEARCH"
              value={tagListSearchTerm}
              onChange={(e) => setTagListSearchTerm(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={searchTagsRef}
            />
          </div>
        </div>
        <div className={styles.collectionContainer}>
          <div className={styles.collectionSavedSwitch} onClick={() => {}}>
            <div className={styles.collectionSavedSwitchLabel}>COLLECTIONS</div>
          </div>
          <div className={styles.collectionSwitchContainer}>
            <div className={styles.collectionList} ref={collectionListRef}>
              {item.collections?.map((collection) => (
                <SavedCollectionItem
                  key={collection.curationRefId}
                  collectionRef={collection}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tagsContainer}>
        <div className={styles.tagListContainer}>
          <select multiple className={styles.tagList} ref={tagListRef}>
            {selectedTagList.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <div className={styles.addChipButton} onClick={handleAddChip}>
            <span className="material-symbols-rounded">add</span>
          </div>
          <div className={styles.tagChipList}>
            {tagChipList.map((chip, index) => (
              <div key={index} className={styles.tagChip}>
                {chip}
                <button
                  className={styles.closeButton}
                  onClick={() => handleRemoveChip(chip)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.editModalId}>
        <div className={styles.mediaIdContainer}>
          <div className={styles.idLabel}>id:</div>
          <div className={styles.idValueContainer}>
            <div className={styles.idValue}>{item.mediaItemId}</div>
          </div>
        </div>
        <div className={styles.saveButton} onClick={() => handleSave()}>
          SAVE
        </div>
      </div>
    </div>
  );
};

export default MediaEditForm;
