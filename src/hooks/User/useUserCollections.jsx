import { useState, useEffect, useCallback } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useUserCollections(username) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserCollections = useCallback(async () => {
    try {
      setLoading(true);

      const resPhotos = await unsplash.users.getCollections({
        username,
        page: 1,
        perPage: 28,
      });

      console.log(resPhotos.response.results);
      setCollections(resPhotos.response.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchUserCollections();
  }, [fetchUserCollections]);

  return { collections, loading };
}
