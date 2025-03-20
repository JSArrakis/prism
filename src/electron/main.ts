import { app, BrowserWindow, Menu } from "electron";
import { ipcMainHandle, isDev } from "./util.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { openFileDialogHandler } from "./handlers/commonHanlders.js";
import {
  getCollectionsHandler,
  createCollectionHandler,
  deleteCollectionHandler,
} from "./handlers/collectionHandlers.js";
import {
  createMovieHandler,
  deleteMovieHandler,
  getMoviesHandler,
} from "./handlers/movieHandlers.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  // Menu.setApplicationMenu(null);
  ipcMainHandle("openFileDialog", async () => {
    return await openFileDialogHandler(mainWindow);
  });
  ipcMainHandle("getCollections", async () => {
    return await getCollectionsHandler();
  });
  ipcMainHandle(
    "createCollection",
    async (_event: any, collection: PrismCurationObj) => {
      return await createCollectionHandler(collection);
    }
  );
  ipcMainHandle(
    "deleteCollection",
    async (_event: any, collection: PrismCurationObj) => {
      return await deleteCollectionHandler(collection);
    }
  );
  ipcMainHandle("getMovies", async () => {
    return await getMoviesHandler();
  });
  ipcMainHandle("createMovie", async (_event: any, movie: PrismMediaItem) => {
    return await createMovieHandler(movie);
  });
  ipcMainHandle("deleteMovie", async (_event: any, movie: PrismMediaItem) => {
    return await deleteMovieHandler(movie);
  });
});
