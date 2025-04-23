const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  openFileDialogHandler: async () => await ipcInvoke("openFileDialog"),
  getCollectionsHandler: async () => await ipcInvoke("getCollections"),
  createCollectionHandler: async (collection: PrismCurationObj) =>
    await ipcInvoke("createCollection", collection),
  deleteCollectionHandler: async (collection: PrismCurationObj) =>
    await ipcInvoke("deleteCollection", collection),
  updateCollectionHandler: async (collection: PrismCurationObj) =>
    await ipcInvoke("updateCollection", collection),
  getMoviesHandler: async () => await ipcInvoke("getMovies"),
  createMovieHandler: async (movie: PrismMediaItem) =>
    await ipcInvoke("createMovie", movie),
  deleteMovieHandler: async (movie: PrismMediaItem) =>
    await ipcInvoke("deleteMovie", movie),
  updateMovieHandler: async (movie: PrismMediaItem) =>
    await ipcInvoke("updateMovie", movie),
  getShowsHandler: async () => await ipcInvoke("getShows"),
  createShowHandler: async (show: PrismMediaItem) =>
    await ipcInvoke("createShow", show),
  deleteShowHandler: async (show: PrismMediaItem) =>
    await ipcInvoke("deleteShow", show),
  updateShowHandler: async (show: PrismMediaItem) =>
    await ipcInvoke("updateShow", show),
  getShortsHandler: async () => await ipcInvoke("getShorts"),
  createShortHandler: async (short: PrismMediaItem) =>
    await ipcInvoke("createShort", short),
  deleteShortHandler: async (short: PrismMediaItem) =>
    await ipcInvoke("deleteShort", short),
  updateShortHandler: async (short: PrismMediaItem) =>
    await ipcInvoke("updateShort", short),
  getMusicHandler: async () => await ipcInvoke("getMusic"),
  createMusicHandler: async (music: PrismMediaItem) =>
    await ipcInvoke("createMusic", music),
  deleteMusicHandler: async (music: PrismMediaItem) =>
    await ipcInvoke("deleteMusic", music),
  updateMusicHandler: async (music: PrismMediaItem) =>
    await ipcInvoke("updateMusic", music),
  getCommercialsHandler: async () => await ipcInvoke("getCommercials"),
  createCommercialHandler: async (commercial: PrismMediaItem) =>
    await ipcInvoke("createCommercial", commercial),
  deleteCommercialHandler: async (commercial: PrismMediaItem) =>
    await ipcInvoke("deleteCommercial", commercial),
  updateCommercialHandler: async (commercial: PrismMediaItem) =>
    await ipcInvoke("updateCommercial", commercial),
  getPromosHandler: async () => await ipcInvoke("getPromos"),
  createPromoHandler: async (promo: PrismMediaItem) =>
    await ipcInvoke("createPromo", promo),
  deletePromoHandler: async (promo: PrismMediaItem) =>
    await ipcInvoke("deletePromo", promo),
  updatePromoHandler: async (promo: PrismMediaItem) =>
    await ipcInvoke("updatePromo", promo),
  getAestheticTagsHandler: async () => await ipcInvoke("getAestheticTags"),
  createAestheticTagHandler: async (tag: Tag) =>
    await ipcInvoke("createAestheticTag", tag),
  deleteAestheticTagHandler: async (tag: Tag) =>
    await ipcInvoke("deleteAestheticTag", tag),
  getEraTagsHandler: async () => await ipcInvoke("getEraTags"),
  createEraTagHandler: async (tag: Tag) => await ipcInvoke("createEraTag", tag),
  deleteEraTagHandler: async (tag: Tag) => await ipcInvoke("deleteEraTag", tag),
  getGenreTagsHandler: async () => await ipcInvoke("getGenreTags"),
  createGenreTagHandler: async (tag: Tag) =>
    await ipcInvoke("createGenreTag", tag),
  deleteGenreTagHandler: async (tag: Tag) =>
    await ipcInvoke("deleteGenreTag", tag),
  getSpecialtyTagsHandler: async () => await ipcInvoke("getSpecialtyTags"),
  createSpecialtyTagHandler: async (tag: Tag) =>
    await ipcInvoke("createSpecialtyTag", tag),
  deleteSpecialtyTagHandler: async (tag: Tag) =>
    await ipcInvoke("deleteSpecialtyTag", tag),
} satisfies Window["electron"]);

function ipcInvoke<Key extends keyof EventPayloadMapping>(
  key: Key,
  ...args: any[]
): Promise<EventPayloadMapping[Key]> {
  return electron.ipcRenderer.invoke(key, ...args);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
  key: Key,
  callback: (payload: EventPayloadMapping[Key]) => void
) {
  electron.ipcRenderer.on(key, (_: any, payload: EventPayloadMapping[Key]) =>
    callback(payload)
  );
}
