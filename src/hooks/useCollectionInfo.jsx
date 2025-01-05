import { useState, useEffect, useCallback } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useCollectionInfo(collectionId) {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCollectionInfo = useCallback(async () => {
    try {
      setLoading(true);

      const resPhotos = await unsplash.collections.get({
        collectionId,
      });

      setInfo(resPhotos.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    fetchCollectionInfo();
  }, [fetchCollectionInfo]);

  return { info, loading };
}
