import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import GalleryPhotos from "../components/GalleryPhotos";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";

import { useCollectionPhotos } from "../hooks/useCollectionPhotos";
import { useCollectionInfo } from "../hooks/useCollectionInfo";

import "./styles/Collection.css";

export default function Collection() {
  const [page, setPage] = useState(1);
  const { collectionId } = useParams();
  const { info } = useCollectionInfo(collectionId);
  const { photos, hasMore, loading } = useCollectionPhotos(collectionId, page);

  if (loading) return <Loading />;
  if (!photos.length > 0) return <NotFound />;

  return (
    <div className="Collection">
      <header>
        <div className="title">
          <h1>{info.title}</h1>
          <h2>{info.total_photos} photos</h2>
        </div>
        <Link className="profile" to={`/user/${info.user?.username}`}>
          <aside>
            <h2>{info.user?.name}</h2>
            <h3>@{info.user?.username}</h3>
          </aside>
          <img src={info.user?.profile_image.large} />
        </Link>
      </header>
      <GalleryPhotos
        data={photos}
        page={page}
        setPage={setPage}
        hasMore={hasMore}
      />
    </div>
  );
}
