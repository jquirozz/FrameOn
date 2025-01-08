import { useState, useEffect, useCallback } from "react";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

const useUserGallery = (endpoint, username, page = 1) => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const PARAMS = { username, page, orderBy: "latest", perPage: 28 };
    let res;

    if (page === 1) setLoading(true);

    try {
      if (endpoint === "getPhotos") {
        res = await unsplash.users.getPhotos(PARAMS);
      } else if (endpoint === "getLikes") {
        res = await unsplash.users.getLikes(PARAMS);
      } else if (endpoint === "getCollections") {
        res = await unsplash.users.getCollections(PARAMS);
      }

      const resultArray = res.response.results;
      const updateHasMore = resultArray.length === 28;
      setData((prev) => (page === 1 ? resultArray : [...prev, ...resultArray]));
      setHasMore(updateHasMore);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [endpoint, username, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, hasMore, loading };
};

export function useUserInfo(username) {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = useCallback(async () => {
    setLoading(true);

    try {
      const resInfo = await unsplash.users.get({ username });
      setInfo(resInfo.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return { info, loading };
}

export const useUserPhotos = (username, page = 1) => {
  return useUserGallery("getPhotos", username, page);
};

export const useUserLikes = (username, page = 1) => {
  return useUserGallery("getLikes", username, page);
};

export const useUserCollections = (username, page = 1) => {
  return useUserGallery("getCollections", username, page);
};
