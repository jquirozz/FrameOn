import { useParams, Link } from "react-router-dom";

import Masonry from "../components/Masonry";
import Loading from "../components/Loading";

import { useCollectionPhotos } from "../hooks/useCollectionPhotos";
import { useCollectionInfo } from "../hooks/useCollectionInfo";

import "./styles/Collection.css";

export default function Collection() {
  const { collectionId } = useParams();
  const { info } = useCollectionInfo(collectionId);
  const { photos, loading } = useCollectionPhotos(collectionId);

  if (loading) return <Loading />;

  return (
    <div className="Collection">
      <header>
        <Link className="profile" to={`/user/${info.user?.username}`}>
          <aside>
            <h3>@{info.user?.username}</h3>
            <h2>{info.user?.name}</h2>
          </aside>
          <img src={info.user?.profile_image.large} />
        </Link>
        <div className="title">
          <h1>{info.title}</h1>
          <h2>{info.total_photos} photos</h2>
        </div>
        <p>{info.description}</p>
      </header>
      <main>
        <Masonry photos={photos} />
      </main>
    </div>
  );
}
