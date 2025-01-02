import { useState, useEffect } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useRandomPhoto(count = 1) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);

      try {
        const res = await unsplash.photos.getRandom({
          count,
          orientation: "landscape",
          query: ["space", "landscapes", "city"],
        });

        setPhotos(res.response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [count]);

  return { photos, loading };
}
