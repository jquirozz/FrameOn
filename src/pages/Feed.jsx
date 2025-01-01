import { useState } from "react";
import { useParams } from "react-router-dom";

import Gallery from "../components/Gallery";

import { usePhotos } from "../hooks/usePhotos";

import "./styles/Feed.css";

export default function Feed() {
  const [page, setPage] = useState(1);
  const { query } = useParams();
  const { photos, hasMore } = usePhotos(query, page);

  return (
    <div className="Feed">
      <Gallery
        photos={photos}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
      />
    </div>
  );
}
