import { useState } from "react";
import { useParams } from "react-router-dom";

import Gallery from "../components/Gallery/PhotosGallery";

import { usePhotos } from "../hooks/usePhotos";

import "./styles/Feed.css";

export default function Feed() {
  const [page, setPage] = useState(1);
  const { query } = useParams();
  const { photos, total, hasMore } = usePhotos(query, page);

  return (
    <div className="Feed">
      {query && (
        <header className="title">
          <h1>{query}</h1>
          <h2>{total} photos</h2>
        </header>
      )}
      <Gallery
        photos={photos}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
      />
    </div>
  );
}
