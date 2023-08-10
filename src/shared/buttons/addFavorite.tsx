import React from "react";
import { Button } from "react-bootstrap";
interface addFavoriteProps {
  songId: string;
}

const AddFavorite: React.FC<addFavoriteProps> = (props) => {

    const handleFavorite = () => {

    }

  return (
    <Button className="btn-light btn-outline-dark" onClick = {handleFavorite}>
      <i className="fa-regular fa-heart"></i>
    </Button>
  );
};

export default AddFavorite;
