import { useState, useEffect, useCallback } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useCollectionPhotos(collectionId, page = 1) {
  const [photos, setPhotos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchCollectionPhotos = useCallback(async () => {
    try {
      setLoading(true);
      const resPhotos = await unsplash.collections.getPhotos({
        collectionId,
        page,
        perPage: 28,
      });

      const photoArray = resPhotos.response.results;
      const updateHasMore = photoArray.length === 28;
      setHasMore(updateHasMore);
      setPhotos((prev) => (page === 1 ? photoArray : [...prev, ...photoArray]));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [collectionId, page]);

  useEffect(() => {
    fetchCollectionPhotos();
  }, [fetchCollectionPhotos]);

  return { photos, hasMore, loading };
}
