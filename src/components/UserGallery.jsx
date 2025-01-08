import { useState } from "react";
import { useParams } from "react-router-dom";

import GalleryPhotos from "../components/GalleryPhotos";
import GalleryCollections from "../components/GalleryCollections";

import {
  useUserPhotos,
  useUserCollections,
  useUserLikes,
} from "../hooks/useUser";

function UserGallery({ username, useDataHook, GalleryComponent }) {
  const [page, setPage] = useState(1);
  const { data, hasMore, loading } = useDataHook(username, page);

  return (
    <GalleryComponent
      data={data}
      page={page}
      setPage={setPage}
      hasMore={hasMore}
      loading={loading}
    />
  );
}

export function UserPhotos() {
  const { username } = useParams();
  return (
    <UserGallery
      username={username}
      useDataHook={useUserPhotos}
      GalleryComponent={GalleryPhotos}
    />
  );
}

export function UserCollections() {
  const { username } = useParams();
  return (
    <UserGallery
      username={username}
      useDataHook={useUserCollections}
      GalleryComponent={GalleryCollections}
    />
  );
}

export function UserLikes() {
  const { username } = useParams();
  return (
    <UserGallery
      username={username}
      useDataHook={useUserLikes}
      GalleryComponent={GalleryPhotos}
    />
  );
}
