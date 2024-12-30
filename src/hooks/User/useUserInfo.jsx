import { useState, useEffect, useCallback } from "react";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

export function useUserInfo(username) {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = useCallback(async () => {
    try {
      setLoading(true);

      const resInfo = await unsplash.users.get({
        username,
      });

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
