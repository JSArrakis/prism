import { useEffect, useState } from "react";
import useRootStack from "../../../navigation/useRootStack";
import { normalizeItem } from "../../../common/helpers";
import {
  useCreateMovie,
  useDeleteMovie,
  useGetAllMovies,
} from "../../../services/media";

interface MoviesData {
  currentMovieList: PrismMediaItem[];
  selectedMovie: PrismMediaItem | null;
  isEditModalOpen: boolean;
}
interface MoviesActions {
  editMovie: (movie: PrismMediaItem) => void;
  saveMovie: (movie: PrismMediaItem) => void;
  onRemove: (movie: PrismMediaItem) => void;
  addMovies: () => void;
  searchMovies: (searchTerm: string) => void;
}

export interface MoviesViewModel extends MoviesData, MoviesActions {}

const useMoviesViewModel = (
  navigate: ReturnType<typeof useRootStack>
): MoviesViewModel => {
  const $getMovies = useGetAllMovies();
  const $createMovie = useCreateMovie();
  const $deleteMovie = useDeleteMovie();

  const [savedMovies, setSavedMovies] = useState<PrismMediaItem[]>([]);

  const [newMovies, setNewMovies] = useState<PrismMediaItem[]>([]);

  const [movies, setMovies] = useState<PrismMediaItem[]>([]);
  const [isEditModalOpen, setEditModalState] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<PrismMediaItem | null>(
    null
  );

  const calculateSize = (obj: any): string => {
    const bytes = new TextEncoder().encode(JSON.stringify(obj)).length;
    const kB = bytes / 1024;
    const mB = kB / 1024;
    const gB = mB / 1024;

    return `${bytes.toFixed(2)} bytes / ${kB.toFixed(2)} KB / ${mB.toFixed(
      2
    )} MB / ${gB.toFixed(2)} GB`;
  };

  useEffect(() => {
    console.log("Current movie list size:", calculateSize(movies));
  }, [movies]);

  useEffect(() => {
    if ($getMovies.data) {
      setSavedMovies($getMovies.data);
    }
  }, [$getMovies.data]);

  useEffect(() => {
    let currentMovies: PrismMediaItem[] = [];
    currentMovies = [...newMovies, ...savedMovies];
    setMovies(currentMovies);
  }, [newMovies, savedMovies]);

  const addMovies = async () => {
    const filePaths = await window.electron.openFileDialogHandler();
    if (filePaths.length > 0) {
      const newMovies = filePaths.map((moviePath: string) => ({
        mediaItemId: normalizeItem(moviePath),
        path: moviePath,
        tags: [],
      }));

      setNewMovies((prev) => [...prev, ...newMovies]);
    }
  };

  const editMovie = (movie: PrismMediaItem) => {
    if (isEditModalOpen) {
      setEditModalState(false);
      return;
    }

    const movieToEdit = movies.find((m) => m.mediaItemId === movie.mediaItemId);
    if (!movieToEdit) {
      console.error("Movie not found:", movie);
      return;
    }
    setSelectedMovie(movieToEdit);
    setEditModalState(true);
  };

  const saveMovie = (movie: PrismMediaItem) => {
    console.log("Saving movie:", movie);
    setEditModalState(false);
    setNewMovies((prev) =>
      prev.filter((m) => m.mediaItemId !== movie.mediaItemId)
    );
    $createMovie.mutate(movie);
  };

  const searchMovies = (searchTerm: string) => {
    console.log("Searching movies:", searchTerm);
  };

  const onRemove = (item: PrismMediaItem) => {
    setEditModalState(false);
    if (item.mediaItemId === selectedMovie?.mediaItemId) {
      setSelectedMovie(null);
    }

    if (newMovies.includes(item)) {
      setNewMovies((prev) =>
        prev.filter((m) => m.mediaItemId !== item.mediaItemId)
      );
      return;
    } else {
      setSavedMovies((prev) =>
        prev.filter((m) => m.mediaItemId !== item.mediaItemId)
      );
      $deleteMovie.mutate(item);
    }
  };

  return {
    currentMovieList: movies,
    selectedMovie,
    isEditModalOpen,
    editMovie,
    saveMovie,
    onRemove,
    addMovies,
    searchMovies,
  };
};

export default useMoviesViewModel;
