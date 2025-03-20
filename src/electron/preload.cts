const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  openFileDialogHandler: async () => await ipcInvoke("openFileDialog"),
  getCollectionsHandler: async () => await ipcInvoke("getCollections"),
  createCollectionHandler: async (collection: PrismCurationObj) =>
    await ipcInvoke("createCollection", collection),
  deleteCollectionHandler: async (collection: PrismCurationObj) =>
    await ipcInvoke("deleteCollection", collection),
  getMoviesHandler: async () => await ipcInvoke("getMovies"),
  createMovieHandler: async (movie: PrismMediaItem) =>
    await ipcInvoke("createMovie", movie),
  deleteMovieHandler: async (movie: PrismMediaItem) =>
    await ipcInvoke("deleteMovie", movie),
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
