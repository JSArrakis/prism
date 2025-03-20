import axios from "axios";

export async function getMoviesHandler(): Promise<PrismMediaItem[]> {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/admin/v1/get-all-movies"
    );
    const movies: PrismMediaItem[] = response.data;
    return movies;
  } catch (error) {
    throw error;
  }
}

export async function createMovieHandler(
  movie: PrismMediaItem
): Promise<{ message: string; status: number }> {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/admin/v1/create-movie",
      movie
    );
    return { message: response.data.message, status: response.status };
  } catch (error) {
    throw error;
  }
}

export async function deleteMovieHandler(
  movie: PrismMediaItem
): Promise<{ message: string; status: number }> {
  try {
    const mediaItemId = movie.mediaItemId;
    const response = await axios.delete(
      `http://localhost:3001/api/admin/v1/delete-movie?mediaItemId=${mediaItemId}`
    );
    return { message: response.data.message, status: response.status };
  } catch (error) {
    throw error;
  }
}
