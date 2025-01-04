import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Post from "../Post";
import Image from "../Image";
import Loading from "../Loading";
import SkeletonGallery from "./SkeletonGallery";

import "./PhotosGallery.css";

export default function PhotosGallery({
  photos,
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

  if (loading) return <SkeletonGallery />;

  return (
    <div className="PhotosGallery">
      <InfiniteScroll
        dataLength={photos.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <main>
          {photos.map((photo) => (
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
