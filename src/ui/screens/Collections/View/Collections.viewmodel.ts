import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useRootStack from "../../../navigation/useRootStack";
import {
  useCreateCollection,
  useDeleteCollection,
  useGetAllCollections,
} from "../../../services/curations/useCollections";

interface CollectionsData {
  isEditModalOpen: boolean;
}
interface CollectionsActions {
  collections: PrismCurationObj[];
  addCollection: () => void;
  searchCollections: (searchTerm: string) => void;
  onEdit: (item: PrismCurationObj) => void;
  onSave: (item: PrismCurationObj) => void;
  onRemove: (item: PrismCurationObj) => void;
}

export interface CollectionsViewModel
  extends CollectionsData,
    CollectionsActions {}

const useCollectionsViewModel = (
  navigate: ReturnType<typeof useRootStack>
): CollectionsViewModel => {
  const $getCollections = useGetAllCollections();
  const $createCollection = useCreateCollection();
  const $deleteCollection = useDeleteCollection();

  const [isEditModalOpen, setEditModalState] = useState(false);
  const [savedCollections, setSavedCollections] = useState<PrismCurationObj[]>(
    []
  );
  const [newCollection, setNewCollection] = useState<PrismCurationObj | null>(
    null
  );
  const [collections, setCollections] = useState<PrismCurationObj[]>([]);

  useEffect(() => {
    if ($getCollections.data) {
      setSavedCollections($getCollections.data);
    }
  }, [$getCollections.data]);

  useEffect(() => {
    let currentCollections: PrismCurationObj[] = [];
    currentCollections = newCollection
      ? [newCollection, ...savedCollections]
      : [...savedCollections];
    setCollections(currentCollections);
  }, [newCollection, savedCollections]);

  const onEdit = (item: PrismCurationObj) => {
    console.log("Editing item:", item);
  };

  const onSave = (item: PrismCurationObj) => {
    setNewCollection(null);
    $createCollection.mutate(item);
  };

  const onRemove = (item: PrismCurationObj) => {
    if (item.mediaItemId === newCollection?.mediaItemId) {
      setNewCollection(null);
      return;
    } else {
      $deleteCollection.mutate(item);
    }
  };

  const searchCollections = (searchTerm: string) => {
    console.log("Searching collections:", searchTerm);
  };

  const addCollection = () => {
    if (newCollection) {
      return;
    }
    const tempCollection: PrismCurationObj = {
      mediaItemId: uuidv4(),
      title: "",
      description: "",
      items: [],
    };
    setNewCollection(tempCollection);
  };

  return {
    isEditModalOpen,
    collections,
    addCollection,
    searchCollections,
    onEdit,
    onSave,
    onRemove,
  };
};

export default useCollectionsViewModel;
