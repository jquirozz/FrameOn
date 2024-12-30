import { useState, useEffect, useCallback } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useUserLikes(username) {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserLikes = useCallback(async () => {
    try {
      setLoading(true);

      const resPhotos = await unsplash.users.getLikes({
        username,
        page: 1,
        perPage: 28,
      });

      console.log(resPhotos.response.results);
      setLikes(resPhotos.response.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchUserLikes();
  }, [fetchUserLikes]);

  return { likes, loading };
}
