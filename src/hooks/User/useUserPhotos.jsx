import { useState, useEffect, useCallback } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useUserPhotos(username, page = 1) {
  const [photos, setPhotos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchUserPhotos = useCallback(async () => {
    try {
      const resPhotos = await unsplash.users.getPhotos({
        username,
        page,
        perPage: 28,
      });

      const photoArray = resPhotos.response.results;
      const updateHasMore = photoArray.length === 28;
      setPhotos((prev) => (page === 1 ? photoArray : [...prev, ...photoArray]));
      setHasMore(updateHasMore);
    } catch (error) {
      console.error(error);
    }
  }, [username, page]);

  useEffect(() => {
    fetchUserPhotos();
  }, [fetchUserPhotos]);

  return { photos, hasMore };
}
