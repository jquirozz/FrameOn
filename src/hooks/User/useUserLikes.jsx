import { useState, useEffect, useCallback } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useUserLikes(username, page = 1) {
  const [likes, setLikes] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchUserLikes = useCallback(async () => {
    try {
      const resPhotos = await unsplash.users.getLikes({
        username,
        page,
        perPage: 28,
      });

      const photoArray = resPhotos.response.results;
      const updateHasMore = photoArray.length === 28;
      setLikes((prev) => (page === 1 ? photoArray : [...prev, ...photoArray]));
      setHasMore(updateHasMore);
    } catch (error) {
      console.error(error);
    }
  }, [username, page]);

  useEffect(() => {
    fetchUserLikes();
  }, [fetchUserLikes]);

  return { likes, hasMore };
}
