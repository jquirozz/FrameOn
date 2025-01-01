import { useState } from "react";
import { useParams } from "react-router-dom";

import PhotosGallery from "../Gallery/PhotosGallery";
import SkeletonGallery from "../Gallery/SkeletonGallery";

import { useUserLikes } from "../../hooks/useUser";

export default function UserLikes() {
  const [page, setPage] = useState(1);
  const { username } = useParams();
  const { data, hasMore, loading } = useUserLikes(username, page);

  if (loading) return <SkeletonGallery />;

  return (
    <div className="UserLikes">
      <PhotosGallery
        photos={data}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
        loading={loading}
      />
    </div>
  );
}
