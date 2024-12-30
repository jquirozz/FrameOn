import { useState, useEffect } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function usePhotos(query = "Christmas", page = 1) {
  const [photos, setPhotos] = useState([]);
  const [info, setInfo] = useState({ total: 0, total_page: 0, hasMore: true });

  useEffect(() => {
    setPhotos([]);
    setInfo({ total: 0, total_page: 0, hasMore: true });
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

        setInfo({
          total: res.response.total,
          total_page: res.response.total_pages,
          hasMore: updateHasMore,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchPhotos();
  }, [query, page]);

  return { photos, info };
}
