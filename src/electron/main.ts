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
import {
  createAestheticTagHandler,
  deleteAestheticTagHandler,
  getAestheticTagsHandler,
} from "./handlers/aestheticTagHandlers.js";
import {
  createEraTagHandler,
  deleteEraTagHandler,
  getEraTagsHandler,
} from "./handlers/eraTagHandlers.js";
import {
  createGenreTagHandler,
  deleteGenreTagHandler,
  getGenreTagsHandler,
} from "./handlers/genreTagHandlers.js";
import {
  createSpecialtyTagHandler,
  deleteSpecialtyTagHandler,
  getSpecialtyTagsHandler,
} from "./handlers/specialtyTagHandlers.js";

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

  ipcMainHandle("getAestheticTags", async () => {
    return await getAestheticTagsHandler();
  });
  ipcMainHandle("createAestheticTag", async (_event: any, tag: Tag) => {
    return await createAestheticTagHandler(tag);
  });
  ipcMainHandle("deleteAestheticTag", async (_event: any, tag: Tag) => {
    return await deleteAestheticTagHandler(tag);
  });
  ipcMainHandle("getEraTags", async () => {
    return await getEraTagsHandler();
  });
  ipcMainHandle("createEraTag", async (_event: any, tag: Tag) => {
    return await createEraTagHandler(tag);
  });
  ipcMainHandle("deleteEraTag", async (_event: any, tag: Tag) => {
    return await deleteEraTagHandler(tag);
  });
  ipcMainHandle("getGenreTags", async () => {
    return await getGenreTagsHandler();
  });
  ipcMainHandle("createGenreTag", async (_event: any, tag: Tag) => {
    return await createGenreTagHandler(tag);
  });
  ipcMainHandle("deleteGenreTag", async (_event: any, tag: Tag) => {
    return await deleteGenreTagHandler(tag);
  });
  ipcMainHandle("getSpecialtyTags", async () => {
    return await getSpecialtyTagsHandler();
  });
  ipcMainHandle("createSpecialtyTag", async (_event: any, tag: Tag) => {
    return await createSpecialtyTagHandler(tag);
  });
  ipcMainHandle("deleteSpecialtyTag", async (_event: any, tag: Tag) => {
    return await deleteSpecialtyTagHandler(tag);
  });
});
