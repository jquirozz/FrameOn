import { useState, useEffect } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function usePhotoById(photoId) {
  const [photo, setPhoto] = useState({});

  useEffect(() => {
    console.log(photoId);
    const fetchPhotoById = async () => {
      try {
        const res = await unsplash.photos.get({
          photoId,
        });
        setPhoto(res.response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPhotoById();
  }, [photoId]);

  return { photo };
}
