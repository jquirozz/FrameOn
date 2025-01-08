import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import Image from "./Image";
import Loading from "./Loading";
import GallerySkeleton from "./GallerySkeleton";

import "./styles/GalleryCollections.css";

export default function GalleryCollections({
  data,
  page,
  setPage,
  hasMore,
  loading,
}) {
  if (loading) return <GallerySkeleton />;

  return (
    <div className="GalleryCollections">
      <InfiniteScroll
        dataLength={data.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <div className="collections">
          {data.map((collection) => (
            <Link key={collection.id} to={`/collection/${collection.id}`}>
              <Image
                photo={collection.cover_photo}
                source={collection.cover_photo?.urls?.small_s3}
              />
              <footer>
                <div className="text">
                  <h2>{collection.title}</h2>
                  <h3>{collection.total_photos} Photos</h3>
                </div>
              </footer>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
