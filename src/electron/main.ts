import { app, BrowserWindow } from "electron";
import { ipcMainHandle, isDev } from "./util.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { openFileDialogHandler } from "./handlers/commonHanlders.js";
import {
  getCollectionsHandler,
  createCollectionHandler,
  deleteCollectionHandler,
  updateCollectionHandler,
} from "./handlers/collectionHandlers.js";
import {
  createMovieHandler,
  deleteMovieHandler,
  getMoviesHandler,
  updateMovieHandler,
} from "./handlers/movieHandlers.js";
import {
  createShowHandler,
  deleteShowHandler,
  getShowsHandler,
  updateShowHandler,
} from "./handlers/showHandlers.js";
import {
  createShortHandler,
  deleteShortHandler,
  getShortsHandler,
  updateShortHandler,
} from "./handlers/shortHandlers.js";
import {
  createMusicHandler,
  deleteMusicHandler,
  getMusicHandler,
  updateMusicHandler,
} from "./handlers/musicHandlers.js";
import {
  createCommercialHandler,
  deleteCommercialHandler,
  getCommercialsHandler,
  updateCommercialHandler,
} from "./handlers/commercialHandlers.js";
import {
  createPromoHandler,
  deletePromoHandler,
  getPromosHandler,
  updatePromoHandler,
} from "./handlers/promoHandlers.js";
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
  ipcMainHandle(
    "updateCollection",
    async (_event: any, collection: PrismCurationObj) => {
      return await updateCollectionHandler(collection);
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
  ipcMainHandle("updateMovie", async (_event: any, movie: PrismMediaItem) => {
    return await updateMovieHandler(movie);
  });
  ipcMainHandle("getShows", async () => {
    return await getShowsHandler();
  });
  ipcMainHandle("createShow", async (_event: any, show: PrismMediaItem) => {
    return await createShowHandler(show);
  });
  ipcMainHandle("deleteShow", async (_event: any, show: PrismMediaItem) => {
    return await deleteShowHandler(show);
  });
  ipcMainHandle("updateShow", async (_event: any, show: PrismMediaItem) => {
    return await updateShowHandler(show);
  });
  ipcMainHandle("getShorts", async () => {
    return await getShortsHandler();
  });
  ipcMainHandle("createShort", async (_event: any, short: PrismMediaItem) => {
    return await createShortHandler(short);
  });
  ipcMainHandle("deleteShort", async (_event: any, short: PrismMediaItem) => {
    return await deleteShortHandler(short);
  });
  ipcMainHandle("updateShort", async (_event: any, short: PrismMediaItem) => {
    return await updateShortHandler(short);
  });
  ipcMainHandle("getMusic", async () => {
    return await getMusicHandler();
  });
  ipcMainHandle("createMusic", async (_event: any, music: PrismMediaItem) => {
    return await createMusicHandler(music);
  });
  ipcMainHandle("deleteMusic", async (_event: any, music: PrismMediaItem) => {
    return await deleteMusicHandler(music);
  });
  ipcMainHandle("updateMusic", async (_event: any, music: PrismMediaItem) => {
    return await updateMusicHandler(music);
  });
  ipcMainHandle("getCommercials", async () => {
    return await getCommercialsHandler();
  });
  ipcMainHandle(
    "createCommercial",
    async (_event: any, commercial: PrismMediaItem) => {
      return await createCommercialHandler(commercial);
    }
  );
  ipcMainHandle(
    "deleteCommercial",
    async (_event: any, commercial: PrismMediaItem) => {
      return await deleteCommercialHandler(commercial);
    }
  );
  ipcMainHandle(
    "updateCommercial",
    async (_event: any, commercial: PrismMediaItem) => {
      return await updateCommercialHandler(commercial);
    }
  );
  ipcMainHandle("getPromos", async () => {
    return await getPromosHandler();
  });
  ipcMainHandle("createPromo", async (_event: any, promo: PrismMediaItem) => {
    return await createPromoHandler(promo);
  });
  ipcMainHandle("deletePromo", async (_event: any, promo: PrismMediaItem) => {
    return await deletePromoHandler(promo);
  });
  ipcMainHandle("updatePromo", async (_event: any, promo: PrismMediaItem) => {
    return await updatePromoHandler(promo);
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
