import { useParams } from "react-router-dom";

import Masonry from "../Masonry";

import { useUserLikes } from "../../hooks/User/useUserLikes";

export default function UserLikes() {
  const { username } = useParams();
  const { likes } = useUserLikes(username);

  return (
    <div className="UserLikes">
      <Masonry photos={likes} />
    </div>
  );
}
