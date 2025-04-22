type PrismCurationObj = {
  mediaItemId: string;
  title: string;
  description: string;
  items: PrismCurationItem[];
};

type PrismCurationItem = {
  sequence?: number;
  mediaItemTitle: string;
  mediaItemId: string;
};

type PrismMediaItem = {
  mediaItemId: string;
  title?: string;
  alias?: string;
  imdb?: string;
  tags: string[];
  path?: string;
  duration?: number;
  durationLimit?: number;
  overDuration?: boolean;
  firstEpisodeOverDuration?: boolean;
  collections?: PrismCurationReference[];
  blocks?: PrismCurationReference[];
  episodeCount?: number;
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
  season?: string;
  episode?: string;
  episodeNumber?: number;
  path: string;
  duration?: number;
  durationLimit?: number;
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
  updateCollection: Promise<{ message: string; status: number }>;
  getMovies: Promise<PrismMediaItem[]>;
  createMovie: Promise<{ message: string; status: number }>;
  deleteMovie: Promise<{ message: string; status: number }>;
  updateMovie: Promise<{ message: string; status: number }>;
  getShows: Promise<PrismMediaItem[]>;
  createShow: Promise<{ message: string; status: number }>;
  deleteShow: Promise<{ message: string; status: number }>;
  updateShow: Promise<{ message: string; status: number }>;
  getShorts: Promise<PrismMediaItem[]>;
  createShort: Promise<{ message: string; status: number }>;
  deleteShort: Promise<{ message: string; status: number }>;
  updateShort: Promise<{ message: string; status: number }>;
  getMusic: Promise<PrismMediaItem[]>;
  createMusic: Promise<{ message: string; status: number }>;
  deleteMusic: Promise<{ message: string; status: number }>;
  updateMusic: Promise<{ message: string; status: number }>;
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
    updateCollectionHandler: (
      collection: PrismCurationObj
    ) => Promise<{ message: string; status: number }>;
    getMoviesHandler: () => Promise<PrismMediaItem[]>;
    createMovieHandler: (
      movie: PrismMediaItem
    ) => Promise<{ message: string; status: number }>;
    deleteMovieHandler: (
      movie: PrismMediaItem
    ) => Promise<{ message: string; status: number }>;
    updateMovieHandler: (
      movie: PrismMediaItem
    ) => Promise<{ message: string; status: number }>;
    getShowsHandler: () => Promise<PrismMediaItem[]>;
    createShowHandler: (
      movie: PrismMediaItem
    ) => Promise<{ message: string; status: number }>;
    deleteShowHandler: (
      movie: PrismMediaItem
    ) => Promise<{ message: string; status: number }>;
    updateShowHandler: (
      movie: PrismMediaItem
    ) => Promise<{ message: string; status: number }>;
    getShortsHandler: () => Promise<PrismMediaItem[]>;
    createShortHandler: (
      short: PrismMediaItem
    ) => Promise<{ message: string; status: number }>;
    deleteShortHandler: (
      short: PrismMediaItem
    ) => Promise<{ message: string; status: number }>;
    updateShortHandler: (
      short: PrismMediaItem
    ) => Promise<{ message: string; status: number }>;
    getMusicHandler: () => Promise<PrismMediaItem[]>;
    createMusicHandler: (
      music: PrismMediaItem
    ) => Promise<{ message: string; status: number }>;
    deleteMusicHandler: (
      music: PrismMediaItem
    ) => Promise<{ message: string; status: number }>;
    updateMusicHandler: (
      music: PrismMediaItem
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
