import { useState, useEffect, useCallback } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useCollectionPhotos(collectionId) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollectionPhotos = useCallback(async () => {
    try {
      setLoading(true);

      const resPhotos = await unsplash.collections.getPhotos({
        collectionId,
        page: 1,
        perPage: 28,
      });

      console.log(resPhotos.response.results);
      setPhotos(resPhotos.response.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    fetchCollectionPhotos();
  }, [fetchCollectionPhotos]);

  return { photos, loading };
}
