type PrismCurationObj = {
  mediaItemId: string;
  title: string;
  description: string;
  items: PrismCurationItem[];
};

type PrismCurationItem = {
  sequence: number;
  title: string;
  mediaItemId: string;
};

type PrismMediaItem = {
  mediaItemId: string;
  title?: string;
  alias?: string;
  imdb?: string;
  tags: string[];
  path: string;
  duration?: number;
  durationLimit?: number;
  collections?: PrismCurationReference[];
  blocks?: PrismCurationReference[];
  episodes?: PrismEpisodeItem[];
};

type PrismCurationReference = {
  curationRefId: string;
  title: string;
  sequence: number;
};

type PrismEpisodeItem = {
  mediaItemId: string;
  title: string;
  alias?: string;
  imdb?: string;
  tags: string[];
};

type PrismSegmentedTags = {
  EraTags: string[];
  GenreTags: string[];
  SpecialtyTags: string[];
  AgeGroupTags: string[];
  HolidayTags: string[];
};

type EventPayloadMapping = {
  openFileDialog: Promise<string[]>;
  getCollections: Promise<PrismCurationObj[]>;
  createCollection: Promise<{ message: string; status: number }>;
  deleteCollection: Promise<{ message: string; status: number }>;
  getMovies: Promise<PrismMediaItem[]>;
  createMovie: Promise<{ message: string; status: number }>;
  deleteMovie: Promise<{ message: string; status: number }>;
};

interface Window {
  electron: {
    openFileDialogHandler: () => Promise<string[]>;
    getCollectionsHandler: () => Promise<PrismCurationObj[]>;
    createCollectionHandler: (
      collection: PrismCurationObj
    ) => Promise<{ message: string; status: number }>;
    deleteCollectionHandler: (
      collection: PrismCurationObj
    ) => Promise<{ message: string; status: number }>;
    getMoviesHandler: () => Promise<PrismMediaItem[]>;
    createMovieHandler: (
      movie: PrismMediaItem
    ) => Promise<{ message: string; status: number }>;
    deleteMovieHandler: (
      movie: PrismMediaItem
    ) => Promise<{ message: string; status: number }>;
  };
}
