import { useState, useEffect, useCallback } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useCollections(page = 1) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchCollections = useCallback(async () => {
    try {
      if (page === 1) setLoading(true);

      const resCollections = await unsplash.collections.list({
        page,
        perPage: 30,
      });

      const collectionsArray = resCollections.response.results;
      const updateHasMore = collectionsArray.length === 30;
      setCollections((prev) =>
        page === 1 ? collectionsArray : [...prev, ...collectionsArray]
      );
      setHasMore(updateHasMore);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return { collections, loading, hasMore };
}
