import { FC } from "react";
import { MoviesViewModel } from "./Movies.viewmodel";
import styles from "./Movies.module.css";
import MediaItemList from "../../../components/MediaItemList/MediaItemList";

interface MoviesViewProps {
  viewModel: MoviesViewModel;
}

const MoviesView: FC<MoviesViewProps> = ({ viewModel }) => {


  const handleEdit = (movie: PrismMediaItem) => {
    viewModel.editMovie(movie);
  };

  const handleAddMovie = () => {
    viewModel.addMovies();
  };

  const handleSearchMovies = (searchTerm: string) => {
    viewModel.searchMovies(searchTerm);
  };

  const selectedMovie = viewModel.selectedMovie
    ? viewModel.selectedMovie
    : { mediaItemId: "", title: "", path: "", tags: [] };

  return (
    <div className={styles.screen}>
      <div className={styles.screenTitle}>Movies</div>
      <div className={styles.mainContent}>
        <div className={styles.movieFormBorder}>
          <div className={styles.movieFormBodyContainer}>
            <MediaItemList
              isEditModalOpen={viewModel.isEditModalOpen}
              items={viewModel.currentMovieList}
              type="movie"
              selectedItem={selectedMovie}
              tags={viewModel.tags}
              collections={viewModel.collections}
              onEdit={handleEdit}
              onSave={viewModel.saveMovie}
              onRemove={viewModel.onRemove}
              onAddItem={handleAddMovie}
              onSearch={handleSearchMovies}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesView;
