import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Login from "./Pages/auth/login";
import Register from "./Pages/auth/register";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Detail from "./Pages/Question/Detail";
import "react-toastify/dist/ReactToastify.css";
import useStore from "./store/store";
import Loading from "./Components/Loading";
import { ToastContainer } from "react-toastify";
import CreateQuestion from "./Pages/Question/CreateQuestion";
import About from "./Pages/About";

function App() {
  const { isLoading } = useStore();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="question">
            <Route path="create" element={<CreateQuestion />} />
            <Route path=":id" element={<Detail />} />
          </Route>
          <Route path="about" element={<About/>} />
          <Route path="*" element={<NotFound />} />
          <Route path="auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
      {isLoading && <Loading />}
      <ToastContainer />
    </>
  );
}

export default App;
