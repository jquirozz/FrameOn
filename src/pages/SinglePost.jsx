import { useParams } from "react-router-dom";

import Post from "../components/Post";

import { usePhotoById } from "../hooks/usePhotoById";

export default function SinglePost() {
  const { postId } = useParams();
  const { photo } = usePhotoById(postId);

  return (
    <div className="SinglePost">
      <Post photo={photo} isOpen={true} />
    </div>
  );
}
