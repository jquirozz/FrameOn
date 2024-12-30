import { useState, useEffect } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function usePhotos(query = "Christmas") {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await unsplash.search.getPhotos({
          query,
          page: 1,
          perPage: 28,
        });

        const photoArray = res.response.results;

        setPhotos(photoArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPhotos();
  }, [query]);

  return { photos };
}
