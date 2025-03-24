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
  EraTags: Tag[];
  GenreTags: Tag[];
  AestheticTags: Tag[];
  SpecialtyTags: Tag[];
  AgeGroupTags: Tag[];
  HolidayTags: Tag[];
};

type Tag = {
  tagId: string;
  name: string;
};

type EventPayloadMapping = {
  openFileDialog: Promise<string[]>;
  getCollections: Promise<PrismCurationObj[]>;
  createCollection: Promise<{ message: string; status: number }>;
  deleteCollection: Promise<{ message: string; status: number }>;
  getMovies: Promise<PrismMediaItem[]>;
  createMovie: Promise<{ message: string; status: number }>;
  deleteMovie: Promise<{ message: string; status: number }>;
  getAestheticTags: Promise<Tag[]>;
  createAestheticTag: Promise<{ message: string; status: number }>;
  deleteAestheticTag: Promise<{ message: string; status: number }>;
  getEraTags: Promise<Tag[]>;
  createEraTag: Promise<{ message: string; status: number }>;
  deleteEraTag: Promise<{ message: string; status: number }>;
  getGenreTags: Promise<Tag[]>;
  createGenreTag: Promise<{ message: string; status: number }>;
  deleteGenreTag: Promise<{ message: string; status: number }>;
  getSpecialtyTags: Promise<Tag[]>;
  createSpecialtyTag: Promise<{ message: string; status: number }>;
  deleteSpecialtyTag: Promise<{ message: string; status: number }>;
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
    getAestheticTagsHandler: () => Promise<Tag[]>;
    createAestheticTagHandler: (
      tag: Tag
    ) => Promise<{ message: string; status: number }>;
    deleteAestheticTagHandler: (
      tag: Tag
    ) => Promise<{ message: string; status: number }>;
    getEraTagsHandler: () => Promise<Tag[]>;
    createEraTagHandler: (
      tag: Tag
    ) => Promise<{ message: string; status: number }>;
    deleteEraTagHandler: (
      tag: Tag
    ) => Promise<{ message: string; status: number }>;
    getGenreTagsHandler: () => Promise<Tag[]>;
    createGenreTagHandler: (
      tag: Tag
    ) => Promise<{ message: string; status: number }>;
    deleteGenreTagHandler: (
      tag: Tag
    ) => Promise<{ message: string; status: number }>;
    getSpecialtyTagsHandler: () => Promise<Tag[]>;
    createSpecialtyTagHandler: (
      tag: Tag
    ) => Promise<{ message: string; status: number }>;
    deleteSpecialtyTagHandler: (
      tag: Tag
    ) => Promise<{ message: string; status: number }>;
  };
}
