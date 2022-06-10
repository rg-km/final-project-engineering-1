import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";
import Home from "./Pages/Home";
import NotFound from "./Pages/Home/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
