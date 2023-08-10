import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

interface getArtistProp {
  id: string;
}

const GetArtist: React.FC<getArtistProp> = (props) => {
  const [artistName, setArtistName] = useState("");
  const MAX_TTL = 3600 * 6;
  useEffect(() => {
    const cachedData = getCachedData(props.id);
    if (cachedData) {
      setArtistName(cachedData);
      return;
    }
    const headers = {
      "X-RapidAPI-Key": "48096cee1bmsh790b19da711398dp1e029ejsn7151413a7df1",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    };
    const params = {
      id: props.id,
      l: "en-US",
    };

    const apiCall = async () => {
      try {
        const res = await axios.get(
          "https://shazam.p.rapidapi.com/artists/get-details",
          {
            headers: headers,
            params: params,
          }
        );
        setArtistName(res.data.data[0].attributes.name);
        cacheData(props.id, res.data.data[0].attributes.name, MAX_TTL);
        console.log(res.data.data[0].attributes.name);
        console.log(Math.floor(Date.now() / 1000));
      } catch (err) {
        console.log(err);
      }
    };

    apiCall();
  }, []);

  const cacheData = (key: string, data: string, TTL: number) => {
    const currentTime = Date.now();
    const item = {
      data: data,
      expiresAt: currentTime + TTL * 1000,
    };

    localStorage.setItem(key, JSON.stringify(item));
  };

  const getCachedData = (key: string): string | null => {
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
  return <Card.Text>Artist: {artistName}</Card.Text>;
};

export default GetArtist;
