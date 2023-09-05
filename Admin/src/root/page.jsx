import React from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/homeLogo.svg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAdminInfo } from "../../redux/asisAdmin";
import Loading from "../loading";

const Root = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = React.useState(true);

  const adminInfo = useSelector((state) => state.asisAdmin.adminInfo);

  const handleEffect = async () => {
    setIsLoaded(true);
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}isLoggedIn`,
      );
      dispatch(setAdminInfo({ admin: data.data }));
      setIsLoaded(false);
      // console.log({ data, admin });
    } catch (error) {
      console.log(error);
      dispatch(setAdminInfo({}));
      setIsLoaded(false);
    }
  };
  React.useEffect(() => {
    handleEffect();
  }, []);

  if (isLoaded) {
    return <Loading />;
  }
  return (
    <>
      {adminInfo.admin ? (
        <main className="space-y-12 px-4 py-5 sm:px-12 xl:px-60">
          <section className="flex flex-col items-center gap-y-3">
            <img src={Logo} alt="Logo" className="h-8" />
            {/* <div className="relative grid w-full grid-cols-2 place-items-center pb-3 text-sm font-medium text-asisDark sm:text-base md:text-lg">
              <Link
                to="/"
                className={`${
                  !location.pathname.includes("/fashion") && "text-asisDark/50"
                }`}
              >
                Asis Fashion Store
              </Link>
              <Link
                to="/retail/"
                className={`${
                  !location.pathname.includes("/retail") && "text-asisDark/50"
                }`}
              >
                Asis Retail Store
              </Link>
              <div className="absolute bottom-0 h-0.5 w-full bg-asisDark/20">
                <div
                  className={`absolute h-full w-1/2 bg-asisDark transition-all duration-200 ${
                    location.pathname.includes("/fashion") && "translate-x-0"
                  }
                ${location.pathname.includes("/retail") && "translate-x-full"}
             `}
                ></div>
              </div>
            </div> */}
          </section>
          <Outlet />
        </main>
      ) : (
        <main className="flex h-full min-h-screen w-full items-center justify-center gap-2 font-normal">
          <Link
            className="rounded bg-asisDark px-8 py-2 text-white"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="rounded border border-asisDark px-8 py-2 text-asisDark"
            to="/signup"
          >
            {" "}
            SignUp
          </Link>
        </main>
      )}
    </>
  );
};

export default Root;
