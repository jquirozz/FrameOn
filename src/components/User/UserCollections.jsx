import { useParams } from "react-router-dom";

import CollectionsGallery from "../CollectionsGallery";

import { useUserCollections } from "../../hooks/User/useUserCollections";

export default function UserCollections() {
  const { username } = useParams();
  const { collections } = useUserCollections(username);

  return (
    <div className="UserCollections">
      <CollectionsGallery collections={collections} />
    </div>
  );
}
