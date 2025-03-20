import axios from "axios";

export async function getCollectionsHandler(): Promise<PrismCurationObj[]> {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/admin/v1/get-all-collections"
    );
    const collections: PrismCurationObj[] = response.data;
    return collections;
  } catch (error) {
    throw error;
  }
}

export async function createCollectionHandler(
  collection: PrismCurationObj
): Promise<{ message: string; status: number }> {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/admin/v1/create-collection",
      collection
    );
    return { message: response.data.message, status: response.status };
  } catch (error) {
    throw error;
  }
}

export async function deleteCollectionHandler(
  collection: PrismCurationObj
): Promise<{ message: string; status: number }> {
  try {
    const mediaItemId = collection.mediaItemId
    const response = await axios.delete(
      `http://localhost:3001/api/admin/v1/delete-collection?mediaItemId=${mediaItemId}`
    );
    return { message: response.data.message, status: response.status };
  } catch (error) {
    throw error;
  }
}
