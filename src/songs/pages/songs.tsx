import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  FreeMode,
  Keyboard,
  Mousewheel,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import axios from "axios";
import "./songs.css";
import { Card } from "react-bootstrap";
import { Track } from "../../types/songsTypes";
import AddFavorite from "../../shared/buttons/addFavorite";
import GetArtist from "../../shared/artist/getArtist";
import AddToPlaylist from "../../shared/buttons/addToPlaylist";

const Songs = () => {
  const [songs, setSongs] = useState<Track[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const MAX_TTL = 3600 * 6;
  useEffect(() => {
    const cachedData = getCachedData("songs");
    if (cachedData) {
      setSongs(cachedData);
      return;
    }

    const headers = {
      "X-RapidAPI-Key": "48096cee1bmsh790b19da711398dp1e029ejsn7151413a7df1",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    };
    const params = {
      key: "484129036",
      locale: "en-US",
    };

    const apiCall = () => {
      axios
        .get("https://shazam.p.rapidapi.com/songs/list-recommendations", {
          headers: headers,
          params: params,
        })
        .then((res) => {
          setSongs(res.data.tracks);
          cacheData("songs", res.data.tracks, MAX_TTL);
          console.log(res.data.tracks);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    apiCall();
  }, []);

  const cacheData = (key: string, data: Track[], TTL: number) => {
    const currentTime = Date.now();
    const item = {
      data: data,
      expiresAt: currentTime + TTL * 1000,
    };

    localStorage.setItem(key, JSON.stringify(item));
  };

  const getCachedData = (key: string): Track[] | null => {
    const cachedData = localStorage.getItem(key);
    if (cachedData !== null) {
      const item = JSON.parse(cachedData);
      const currentTime = Date.now();
      if (item.expiresAt > currentTime) {
        return item.data;
      } else {
        localStorage.removeItem(key);
        return null;
      }
    }
    return null;
  };

  // const some = songs.slice(0, 3);
  return (
    <>
      <p>Current Hits:</p>
      <Swiper
        modules={[Navigation, Pagination, FreeMode, Keyboard, Mousewheel]}
        slidesPerView={4}
        spaceBetween={10}
        loop={true}
        navigation={true}
        grabCursor={true}
        centeredSlides={true}
        keyboard={{
          enabled: true,
        }}
        freeMode={true}
        mousewheel={true}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {songs.map((track) => (
          <SwiperSlide key={track.key}>
            <Card.Body className="">
              <div className="d-flex flex-row gap-2 align-self-baseline">
                <Card.Img
                  variant="top"
                  src={track.images.coverart}
                  style={{ width: "10rem", marginTop: "10px" }}
                />
                <div className="d-flex flex-column gap-2 mt-3">
                  <AddFavorite songId={track.key} />
                  <AddToPlaylist />
                </div>
              </div>
              <Card.Title style={{ fontSize: "small" }}>
                {track.title}
              </Card.Title>
              {/* <GetArtist id={track.artists[0].adamid}/> */}
            </Card.Body>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Songs;
