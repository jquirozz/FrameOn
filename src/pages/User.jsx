import { useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

import Loading from "../components/Loading";

import { useUserInfo } from "../hooks/useUser";

import { formatNumber } from "../utils/formatNumber";

import "./styles/User.css";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineHeart } from "react-icons/ai";
import {
  IoCameraOutline,
  IoAlbumsOutline,
  IoLogoInstagram,
  IoPlanetOutline,
  IoFolderOutline,
  IoChatboxOutline,
} from "react-icons/io5";

export default function User() {
  const { username } = useParams();
  const { info, loading } = useUserInfo(username);

  if (loading) return <Loading />;

  return (
    <div className="User">
      <UserInfo info={info} />
      <footer className="galleryWrap">
        <UserGalleryNav info={info} />
        <Outlet />
      </footer>
    </div>
  );
}

function UserInfo({ info }) {
  const [isFollowing, setIsFollowing] = useState(info.followed_by_user);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleJob = () => {};

  const handleContact = () => {};

  const HEADER_INFO = [
    {
      title: "followers",
      count: formatNumber(info.followers_count),
    },
    {
      title: "following",
      count: formatNumber(info.following_count),
    },
    {
      title: "photos",
      count: formatNumber(info.total_photos),
    },
  ];

  const SOCIAL_LINKS = [
    {
      title: "instagram",
      exists: info.instagram_username !== null,
      url: `https://www.instagram.com/${info.instagram_username}.com`,
      icon: <IoLogoInstagram color="FFF" />,
      colors: ["F9CE34", "EE2A7B", "6228D7"],
    },
    {
      title: "twitter",
      exists: info.twitter_username !== null,
      url: `https://www.x.com/${info.twitter_username}.com`,
      icon: <FaXTwitter color="FFF" />,
      colors: ["000", "000", "000"],
    },
    {
      title: "portfolio",
      exists: info.portfolio_url !== null,
      url: info.portfolio_url,
      icon: <IoPlanetOutline color="000" />,
      colors: ["FFF", "FFF", "FFF"],
    },
  ];

  return (
    <header className="userInfo">
      <section className="main">
        <img src={info.profile_image?.large} />
        <section className="username">
          <h3>@{info.username}</h3>
          <h2>{info.name}</h2>
        </section>
        <section className="social">
          {SOCIAL_LINKS.map(
            (social) =>
              social.exists && (
                <Link
                  to={social.url}
                  key={social.title}
                  target="_BLANK"
                  style={{
                    background: `linear-gradient(90deg, #${social.colors[0]} 0%, #${social.colors[1]} 50%, #${social.colors[2]} 100%)`,
                  }}
                >
                  {social.icon}
                </Link>
              )
          )}
        </section>
      </section>
      {info.bio && <p>{info.bio}</p>}
      <section className="actions">
        <header>
          {HEADER_INFO.map((info) => (
            <div key={info.title}>
              <h3>{info.count}</h3>
              <h4>{info.title}</h4>
            </div>
          ))}
        </header>
        <footer>
          <button onClick={handleJob}>
            <IoFolderOutline />
          </button>
          <button
            onClick={handleFollow}
            className={`follow ${isFollowing ? "following" : ""}`}
          >
            <h3>{!isFollowing ? "Follow" : "Unfollow"}</h3>
          </button>
          <button onClick={handleContact}>
            <IoChatboxOutline />
          </button>
        </footer>
      </section>
    </header>
  );
}

function UserGalleryNav({ info }) {
  const NAV_OPTIONS = [
    {
      title: "photos",
      total: info.total_photos,
      icon: <IoCameraOutline />,
    },
    {
      title: "collections",
      total: info.total_collections,
      icon: <IoAlbumsOutline />,
    },
    {
      title: "likes",
      total: info.total_likes,
      icon: <AiOutlineHeart />,
    },
  ];

  return (
    <nav className="galleryNav">
      {NAV_OPTIONS.map(
        (option) =>
          option.total > 0 && (
            <NavLink
              to={`/user/${info.username}/${option.title}`}
              key={option.title}
            >
              {option.icon}
              <h4>{option.title}</h4>
            </NavLink>
          )
      )}
    </nav>
  );
}
