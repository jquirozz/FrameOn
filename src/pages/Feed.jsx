import { useState } from "react";
import { useParams } from "react-router-dom";

import PhotosGallery from "../components/Gallery/PhotosGallery";
import Loading from "../components/Loading";

import { useSearch } from "../hooks/useSearch";

import "./styles/Feed.css";

export default function Feed() {
  const [page, setPage] = useState(1);
  const { query } = useParams();
  const { photos, total, hasMore, loading } = useSearch(query, page);

  if (loading) return <Loading />;

  return (
    <div className="Feed">
      {query && (
        <header className="title">
          <h1>{query}</h1>
          <h2>{total} photos</h2>
        </header>
      )}
      <PhotosGallery
        photos={photos}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
      />
    </div>
  );
}
