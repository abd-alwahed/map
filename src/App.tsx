import { MapView } from "./components/Map";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRoutes,
} from "react-router-dom";
import LoginForm from "./components/Login";
import Locations from "./components/Locatios";

import AuthProvider from "./components/providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/list_location" element={<Locations />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer
        position="top-left"
        autoClose={0.5}
        hideProgressBar={false}
        limit={1}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  );
};
export default App;
