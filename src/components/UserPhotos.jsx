import { useState } from "react";
import { useParams } from "react-router-dom";

import PhotosGallery from "./Gallery/PhotosGallery";

import { useUserPhotos } from "../hooks/useUser";

export default function UserPhotos() {
  const [page, setPage] = useState(1);
  const { username } = useParams();
  const { data, hasMore, loading } = useUserPhotos(username, page);

  return (
    <PhotosGallery
      photos={data}
      page={page}
      setPage={setPage}
      hasMore={hasMore}
      loading={loading}
    />
  );
}
