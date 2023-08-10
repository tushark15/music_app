import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import "./searchPage.css";
import { TracksHit } from "../types/searchTypes";
import GetArtist from "../shared/artist/getArtist";
import AddFavorite from "../shared/buttons/addFavorite";
import AddToPlaylist from "../shared/buttons/addToPlaylist";

const SearchPage = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [hits, setHits] = useState<TracksHit[]>([]);

  const debounceTimeoutRef = useRef<number | undefined>();
  const MAX_TTL = 3600 * 6;

  const handleChange = (val: string) => {
    setDebouncedSearchTerm(val);
    console.log(Math.floor(Date.now() / 1000));
  };

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setHits([]);
      return;
    }

    const cachedData = getCachedData(debouncedSearchTerm);
    if (cachedData) {
      setHits(cachedData);
      return;
    }

    const headers = {
      "X-RapidAPI-Key": "48096cee1bmsh790b19da711398dp1e029ejsn7151413a7df1",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    };
    const params = {
      term: debouncedSearchTerm,
      locale: "en-US",
      offset: "0",
      limit: "5",
    };

    const apiCall = async () => {
      try {
        const res = await axios.get("https://shazam.p.rapidapi.com/search", {
          headers: headers,
          params: params,
        });
        setHits(res.data.tracks.hits);
        cacheData(debouncedSearchTerm, res.data.tracks.hits, MAX_TTL);
        console.log(res.data.tracks.hits);
        console.log(Math.floor(Date.now() / 1000));
      } catch (err) {
        console.log(err);
      }
    };
    clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = window.setTimeout(apiCall, 500);

    return () => {
      clearTimeout(debounceTimeoutRef.current);
    };
  }, [debouncedSearchTerm]);

  const cacheData = (key: string, data: TracksHit[], TTL: number) => {
    const currentTime = Date.now();
    const item = {
      data: data,
      expiresAt: currentTime + TTL * 1000,
    };

    localStorage.setItem(key, JSON.stringify(item));
  };

  const getCachedData = (key: string): TracksHit[] | null => {
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

  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2 searchBar bg-light border-dark"
          onChange={(e) => {
            e.preventDefault();
            handleChange(e.target.value);
          }}
        />
      </Form>
      <ListGroup>
        {hits?.length > 1 ? (
          hits.map((track) => (
            <ListGroup.Item className="mt-3 items" key={track.track.key}>
              {track.track.title}
              <div className="flex flex-row float-end gap-2">
                <AddFavorite songId={track.track.key} />
                <AddToPlaylist />
              </div>
              <GetArtist id={track.track.artists[0].adamid} />
            </ListGroup.Item>
          ))
        ) : (
          <h3 className="searchText mt-5">Search for a song</h3>
        )}
      </ListGroup>
    </>
  );
};

export default SearchPage;
