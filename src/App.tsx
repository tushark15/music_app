import MainHeader from "./shared/navigation/MainHeader";
import Songs from "./songs/pages/songs";
import SearchPage from "./searchPage/searchPage";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import SideBar from "./shared/navigation/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
const App = () => {
  const routes = (
    <Routes>
      <Route path="/" element={<Songs />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
  return (
    <Router>
      <Row>
        <Col>
          <MainHeader/>
        </Col>
      </Row>
      <Row>
        <Col md={2} sm={2} xs={3}>
          <SideBar/>
        </Col>
        <Col md={9} sm={9} xs={5}>
          <main>{routes}</main>
        </Col>
      </Row>
    </Router>
  );
};

export default App;
