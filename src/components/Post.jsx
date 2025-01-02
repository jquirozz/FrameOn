import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Image from "./Image";

import { formatDate } from "../utils/formatDate";

import "./styles/Post.css";
import { IoClose, IoCheckmarkSharp } from "react-icons/io5";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { PiShareNetwork } from "react-icons/pi";
import { AiOutlineSave } from "react-icons/ai";

export default function Post({ photo, isOpen, setIsOpen }) {
  const [like, setLike] = useState(photo.liked_by_user);
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const handleLike = () => {
    setLike(!like);
  };

  const handleShare = async (postId) => {
    const { origin } = window.location;
    const url = `${origin}/post/${postId}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  const handleDownload = () => {};

  const handleClosePhoto = () => {
    if (setIsOpen) setIsOpen(false);
    navigate("/feed");
  };

  const description = photo.description || photo.alt_description;

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
              <button onClick={handleLike}>
                {like ? <AiFillHeart color="F22" /> : <AiOutlineHeart />}
              </button>
              <button onClick={handleDownload}>
                <AiOutlineSave />
              </button>
              <button onClick={() => handleShare(photo.id)}>
                {copied ? <IoCheckmarkSharp /> : <PiShareNetwork />}
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
        <h3>@{user?.username}</h3>
        <h2>
          {user?.first_name} {user?.last_name}
        </h2>
      </section>
    </Link>
  );
}
