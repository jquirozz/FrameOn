import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "./Post";
import Image from "./Image";
import Loading from "./Loading";
import GallerySkeleton from "./GallerySkeleton";

import "./styles/GalleryPhotos.css";

export default function GalleryPhotos({
  data,
  page,
  setPage,
  hasMore,
  loading,
}) {
  const [selected, setSelected] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handlePhotoView = (photo) => {
    if (!isOpen) {
      setSelected(photo);
    }
    setIsOpen(!isOpen);
  };

  if (loading) return <GallerySkeleton />;

  if (data.length === 0)
    return (
      <div className="GalleryPhotos">
        <p>Ops! Looks like there are no photos available</p>
      </div>
    );

  return (
    <div className="GalleryPhotos">
      <InfiniteScroll
        dataLength={data.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <main>
          {data.map((photo) => (
            <div key={photo.id} onClick={() => handlePhotoView(photo)}>
              <Image photo={photo} source={photo.urls?.small} />
            </div>
          ))}
        </main>
      </InfiniteScroll>
      {isOpen && (
        <Post photo={selected} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </div>
  );
}
