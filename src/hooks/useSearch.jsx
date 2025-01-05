import { useState, useEffect, useCallback } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useSearch(query = "photos", page = 1, orderBy = "relevant") {
  const [photos, setPhotos] = useState([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTotal(0);
    setPhotos([]);
    setHasMore(true);
  }, [query, orderBy]);

  const fetchSearch = useCallback(async () => {
    try {
      page === 1 && setLoading(true);

      const res = await unsplash.search.getPhotos({
        query,
        page,
        orderBy,
        perPage: 30,
      });

      const photoArray = res.response.results;
      const updateHasMore = photoArray.length === 30;
      setPhotos((prev) => (page === 1 ? photoArray : [...prev, ...photoArray]));
      setTotal(res.response.total);
      setHasMore(updateHasMore);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [query, page, orderBy]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  return { photos, total, hasMore, loading };
}
