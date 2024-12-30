import { useState, useEffect, useCallback } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useCollections(page = 1) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = useCallback(async () => {
    try {
      setLoading(true);

      const resCollections = await unsplash.collections.list({
        page,
        perPage: 28,
      });

      console.log(resCollections.response.results);
      setCollections(resCollections.response.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return { collections, loading };
}
