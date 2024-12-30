import { useParams } from "react-router-dom";

import Masonry from "../Masonry";

import { useUserPhotos } from "../../hooks/User/useUserPhotos";

export default function UserPhotos() {
  const { username } = useParams();
  const { photos } = useUserPhotos(username);

  return (
    <div className="UserPhotos">
      <Masonry photos={photos} />
    </div>
  );
}
