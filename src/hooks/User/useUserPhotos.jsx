import { useState, useEffect, useCallback } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useUserPhotos(username) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserPhotos = useCallback(async () => {
    try {
      setLoading(true);

      const resPhotos = await unsplash.users.getPhotos({
        username,
        page: 1,
        perPage: 28,
      });

      setPhotos(resPhotos.response.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchUserPhotos();
  }, [fetchUserPhotos]);

  return { photos, loading };
}
