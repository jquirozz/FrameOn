import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Image from "./Image";

import { formatDate } from "../utils/formatDate";

import "./styles/Post.css";
import { IoClose } from "react-icons/io5";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { PiShareNetwork } from "react-icons/pi";
import { AiOutlineSave } from "react-icons/ai";

export default function Post({ photo, isOpen, setIsOpen }) {
  const [like, setLike] = useState(photo.liked_by_user);

  const description = photo.description || photo.alt_description;

  const handleLike = () => {
    setLike(!like);
  };

  const handleShare = () => {};

  const handleDownload = () => {};

  const handleClosePhoto = (event) => {
    if (event.key === "Escape" || event.type === "click") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleClosePhoto);

    return () => {
      window.removeEventListener("keydown", handleClosePhoto);
    };
  }, []);

  return (
    <section className={`Post ${isOpen ? "open" : "close"}`}>
      <div className="post">
        <Profile id="mobile" user={photo.user} />
        <section className="image">
          <Image photo={photo} source={photo.urls?.regular} />
        </section>
        <article>
          <header>
            <Profile user={photo.user} />
            <button className="close" onClick={handleClosePhoto}>
              <IoClose />
            </button>
          </header>
          <section className="info">
            <div className="actions">
              <button onClick={handleLike} className={like ? "liked" : ""}>
                {like ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
              <button onClick={handleDownload} disabled>
                <AiOutlineSave />
              </button>
              <button onClick={handleShare} disabled>
                <PiShareNetwork />
              </button>
            </div>
            <div className="description">
              {description && <p>{description}</p>}
              <h5>{formatDate(photo.updated_at)}</h5>
            </div>
          </section>
        </article>
      </div>
    </section>
  );
}

function Profile({ user, id }) {
  return (
    <Link to={`/user/${user?.username}`} className="Profile" id={id}>
      <img src={user?.profile_image?.large} />
      <section>
        <h2>
          {user?.first_name} {user?.last_name}
        </h2>
        <h3>@{user?.username}</h3>
      </section>
    </Link>
  );
}
