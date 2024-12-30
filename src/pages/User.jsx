import { useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";

import Loading from "../components/Loading";

import { useUserInfo } from "../hooks/User/useUserInfo";

import { formatNumber } from "../services/formatNumber";

import "./styles/User.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { BiMessageRounded } from "react-icons/bi";
import { LiaHandshakeSolid } from "react-icons/lia";
import {
  IoCameraOutline,
  IoAlbumsOutline,
  IoLogoInstagram,
  IoPlanetOutline,
} from "react-icons/io5";

export default function User() {
  const { username } = useParams();
  const { info, loading } = useUserInfo(username);

  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

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

  if (loading) return <Loading />;

  return (
    <div className="User">
      <header className="userInfo">
        <section className="main">
          <img src={info.profile_image?.large} />
          <section>
            <h3>@{info.username}</h3>
            <h2>{info.name}</h2>
          </section>
          <footer>
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
          </footer>
        </section>
        <p>{info.bio}</p>
        <section className="actions">
          <header>
            <div>
              <h3>{formatNumber(info.total_photos)}</h3>
              <h4>Photos</h4>
            </div>
            <div>
              <h3>{formatNumber(info.followers_count)}</h3>
              <h4>Followers</h4>
            </div>
            <div>
              <h3>{formatNumber(info.following_count)}</h3>
              <h4>Following</h4>
            </div>
          </header>
          <footer>
            <button>
              <BiMessageRounded />
            </button>
            <button
              onClick={handleFollow}
              className={isFollowing ? "following" : ""}
            >
              <h3>{!isFollowing ? "Follow" : "Unfollow"}</h3>
            </button>

            <button>
              <LiaHandshakeSolid />
            </button>
          </footer>
        </section>
      </header>
      <main>
        <nav>
          {NAV_OPTIONS.map(
            (option) =>
              option.total > 0 && (
                <NavLink
                  to={`/user/${username}/${option.title}`}
                  key={option.title}
                >
                  {option.icon}
                  <h4>{option.title}</h4>
                </NavLink>
              )
          )}
        </nav>
        <Outlet />
      </main>
    </div>
  );
}
