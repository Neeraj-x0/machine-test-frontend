import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "./components/sideBar";
import Main from "./components/main";

function Home() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const [isValid, setIsValid] = useState(null);

  const checkToken = async () => {
    try {
      const response = await axios.post(
        "https://machine-backend.neerajx0.xyz/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      setIsValid(response.data);
    } catch (error) {
      setIsValid(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (cookies.token) {
      checkToken();
    } else {
      setIsValid(false);
      navigate("/login");
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.token, navigate]);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isValid ? (
        <div className="flex">
          <SideBar />
          <Main name={isValid.name} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Home;
