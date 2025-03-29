import { use, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useRootStack from "../../../navigation/useRootStack";
import {
  useCreateCollection,
  useDeleteCollection,
  useGetAllCollections,
  useUpdateCollection,
} from "../../../services/curations/useCollections";
import { useGetAllMovies } from "../../../services/media/useMovies";

interface CollectionsData {
  isEditModalOpen: boolean;
}
interface CollectionsActions {
  selectedCollection: PrismCurationObj | null;
  collections: PrismCurationObj[];
  movies: PrismMediaItem[];
  addCollection: () => void;
  onEdit: (item: PrismCurationObj) => void;
  onSave: () => void;
  onSaveNew: (item: PrismCurationObj) => void;
  onRemove: (item: PrismCurationObj) => void;
  onAddMedia: (item: PrismMediaItem) => void;
  onRemoveMedia: (item: PrismCurationItem) => void;
  onUpdateSequence: (item: PrismCurationItem, sequence: number | null) => void;
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
  const $updateCollection = useUpdateCollection();
  const $movies = useGetAllMovies();

  const [isEditModalOpen, setEditModalState] = useState(false);
  const [savedCollections, setSavedCollections] = useState<PrismCurationObj[]>(
    []
  );
  const [newCollection, setNewCollection] = useState<PrismCurationObj | null>(
    null
  );
  const [collections, setCollections] = useState<PrismCurationObj[]>([]);
  const [selectedCollection, setSelectedCollection] =
    useState<PrismCurationObj | null>(null);
  const [movies, setMovies] = useState<PrismMediaItem[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<PrismMediaItem[]>([]);

  useEffect(() => {
    if ($getCollections.data) {
      setSavedCollections($getCollections.data);
    }
  }, [$getCollections.data]);

  useEffect(() => {
    if ($movies.data) {
      setMovies($movies.data);
    }
  }, [$movies.data]);

  useEffect(() => {
    let currentCollections: PrismCurationObj[] = [];
    currentCollections = newCollection
      ? [newCollection, ...savedCollections]
      : [...savedCollections];
    setCollections(currentCollections);
  }, [newCollection, savedCollections]);

  useEffect(() => {
    if (selectedCollection) {
      const filtered = movies.filter(
        (movie) =>
          !selectedCollection.items.some(
            (item) => item.mediaItemId === movie.mediaItemId
          )
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [selectedCollection, movies]);

  const onEdit = (collection: PrismCurationObj) => {
    if (isEditModalOpen) {
      setSelectedCollection(null);
      setEditModalState(false);
      return;
    }

    const collectionToEdit = collections.find(
      (m) => m.mediaItemId === collection.mediaItemId
    );
    if (!collectionToEdit) {
      console.error("Collection not found:", collection);
      return;
    }

    const deepCopiedCollection = JSON.parse(JSON.stringify(collectionToEdit));
    setSelectedCollection(deepCopiedCollection);
    setEditModalState(true);
  };

  const onSaveNew = (item: PrismCurationObj) => {
    $createCollection.mutate(item);
    setNewCollection(null);
    setEditModalState(false);
  };

  const onSave = () => {
    const deepCopiedSelectedCollection = JSON.parse(
      JSON.stringify(selectedCollection)
    );
    const existingCollection = collections.find(
      (c) => c.mediaItemId === deepCopiedSelectedCollection.mediaItemId
    );
    if (existingCollection) {
      $updateCollection.mutate(deepCopiedSelectedCollection);
      setSelectedCollection(null);
      setEditModalState(false);
      return;
    }
    $createCollection.mutate(deepCopiedSelectedCollection);
    setSelectedCollection(null);
    setEditModalState(false);
  };

  const onRemove = (item: PrismCurationObj) => {
    if (item.mediaItemId === newCollection?.mediaItemId) {
      setNewCollection(null);
      return;
    } else {
      $deleteCollection.mutate(item);
    }
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

  const onAddMedia = (item: PrismMediaItem) => {
    if (!selectedCollection) {
      console.error("No collection selected");
      return;
    }
    const updatedCollection = {
      ...selectedCollection,
    };
    updatedCollection.items.push({
      mediaItemTitle: item.title || "",
      mediaItemId: item.mediaItemId,
    });

    setSelectedCollection({ ...updatedCollection });

    setFilteredMovies((prev) =>
      prev.filter((movie) => movie.mediaItemId !== item.mediaItemId)
    );
  };

  const onRemoveMedia = (item: PrismCurationItem) => {
    if (!selectedCollection) {
      console.error("No collection selected");
      return;
    }
    const updatedCollection = {
      ...selectedCollection,
    };
    updatedCollection.items = updatedCollection.items.filter(
      (i) => i.mediaItemId !== item.mediaItemId
    );

    setSelectedCollection(updatedCollection);

    const removedMovie = movies.find(
      (movie) => movie.mediaItemId === item.mediaItemId
    );
    if (removedMovie) {
      setFilteredMovies((prev) => [...prev, removedMovie]);
    }
  };

  const onUpdateSequence = (
    item: PrismCurationItem,
    sequence: number | null
  ) => {
    if (!selectedCollection) {
      console.error("No collection selected");
      return;
    }
    const updatedCollection = {
      ...selectedCollection,
    };
    const itemIndex = updatedCollection.items.findIndex(
      (i) => i.mediaItemId === item.mediaItemId
    );
    if (itemIndex === -1) {
      console.error("Item not found in collection:", item);
      return;
    }
    updatedCollection.items[itemIndex].sequence = sequence ?? undefined;
    setSelectedCollection(updatedCollection);
  };

  return {
    selectedCollection,
    isEditModalOpen,
    collections,
    movies: filteredMovies,
    addCollection,
    onEdit,
    onSave,
    onSaveNew,
    onRemove,
    onAddMedia,
    onRemoveMedia,
    onUpdateSequence,
  };
};

export default useCollectionsViewModel;
