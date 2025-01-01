import { useState, useEffect } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function usePhotos(query = "Happy new year", page = 1) {
  const [photos, setPhotos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPhotos([]);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await unsplash.search.getPhotos({
          query,
          page,
          perPage: 28,
        });

        const photoArray = res.response.results;
        const updateHasMore = photoArray.length === 28;
        setPhotos((prev) =>
          page === 1 ? photoArray : [...prev, ...photoArray]
        );
        setHasMore(updateHasMore);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPhotos();
  }, [query, page]);

  return { photos, hasMore };
}
