import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";
import Home from "./Pages/Home";
import NotFound from "./Pages/Home/NotFound";
import Detail from "./Pages/Question/Detail";
import "react-toastify/dist/ReactToastify.css";
import useStore from "./store/store";
import Loading from "./Components/Loading";

function App() {
  const { isLoading } = useStore();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="question">
            <Route path=":id" element={<Detail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
      {isLoading && <Loading />}
    </>
  );
}

export default App;
