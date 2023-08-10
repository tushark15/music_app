import { Navbar, Nav, Container } from "react-bootstrap";
const Navlinks = () => {
  return (
    <Navbar className="navbar navbar-expand vh-100 bg-light">
      <Container className="">
        <Nav justify variant="tabs"className="flex-column navbar-nav">
          <Nav.Link className="my-3 bg-light" href="/">
            Home
          </Nav.Link>
          <Nav.Link className="my-3 bg-light" href="/search">
            Search
          </Nav.Link>
          <Nav.Link className="my-3 bg-light" href="/fav">
            Favourites
          </Nav.Link>
          <Nav.Link className="my-3 bg-light" href="/playlists">
            Playlists
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navlinks;
