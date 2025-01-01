import { useState } from "react";
import { useParams } from "react-router-dom";

import Gallery from "../Gallery";

import { useUserPhotos } from "../../hooks/User/useUserPhotos";

export default function UserPhotos() {
  const [page, setPage] = useState(1);
  const { username } = useParams();
  const { photos, hasMore } = useUserPhotos(username, page);

  return (
    <div className="UserPhotos">
      <Gallery
        photos={photos}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
      />
    </div>
  );
}
