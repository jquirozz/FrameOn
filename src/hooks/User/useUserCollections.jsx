import { useState, useEffect, useCallback } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useUserCollections(username, page = 1) {
  const [collections, setCollections] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchUserCollections = useCallback(async () => {
    try {
      const resPhotos = await unsplash.users.getCollections({
        username,
        page,
        perPage: 28,
      });

      const collectionsArray = resPhotos.response.results;
      const updateHasMore = collectionsArray.length === 28;
      setCollections((prev) =>
        page === 1 ? collectionsArray : [...prev, ...collectionsArray]
      );
      setHasMore(updateHasMore);
    } catch (error) {
      console.error(error);
    }
  }, [username, page]);

  useEffect(() => {
    fetchUserCollections();
  }, [fetchUserCollections]);

  return { collections, hasMore };
}
