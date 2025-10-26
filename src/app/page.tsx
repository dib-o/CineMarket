"use client";

import clsx from "clsx";
import "boxicons/css/boxicons.min.css";
import bgGIF from "@/bg/gif1.gif";
import bgHome from "@/bg/home.jpg";
import { useEffect, useState } from "react";
import Login from "./login/page";
import ChangeInfo from "./changeInfo/page";
import Search from "./search/page";
import Favorite from "./favorite/page";
import Browse from "./browse/page";
import Home from "./home/page";

export default function Cover() {
  const [page, setPage] = useState("Home");
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userDate, setUserDate] = useState("");
  const [viewAccount, setViewAccount] = useState(false);

  const [emailCursorIn, setEmailCursorIn] = useState(false);
  const [passwordCursorIn, setPasswordCursorIn] = useState(false);
  const [changeInfo, setChangeInfo] = useState(false);
  const [changeInfoType, setChangeInfoType] = useState("");

  const [menu, setMenu] = useState(false);
  const handleExit = (onExit: string) => {
    setPage(onExit);
  };
  const handleLogin = (
    userId: number,
    username: string,
    email: string,
    password: string,
    date: string
  ) => {
    setUserId(userId);
    setUsername(username);
    setUserEmail(email);
    setUserPassword(password);
    setUserDate(date);
    setPage("Home");
  };
  const handleLogout = () => {
    setUserId(0);
    setUsername("");
    setUserEmail("");
    setUserPassword("");
    setUserDate("");
    setViewAccount(false);
    localStorage.removeItem("");
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUsername");
    localStorage.removeItem("currentUserEmail");
    localStorage.removeItem("currentUserPassword");
    localStorage.removeItem("currentUserDate");
    setPage("Home");
  };

  const handleInfoChange = (newEmail: string, newPassword: string) => {
    setUserEmail(newEmail);
    setUserPassword(newPassword);
  };
  const handleInfoExit = () => {
    setChangeInfo(false);
  };

  useEffect(() => {
    const currentUserId = localStorage.getItem("currentUserId");
    const currentUsername = localStorage.getItem("currentUsername");
    const currentUserEmail = localStorage.getItem("currentUserEmail");
    const currentUserPassword = localStorage.getItem("currentUserPassword");
    const currentUserDate = localStorage.getItem("currentUserDate");

    if (
      currentUserId &&
      currentUsername &&
      currentUserEmail &&
      currentUserPassword &&
      currentUserDate
    ) {
      setUserId(Number(JSON.parse(currentUserId)));
      setUsername(JSON.parse(currentUsername));
      setUserEmail(JSON.parse(currentUserEmail));
      setUserPassword(JSON.parse(currentUserPassword));
      setUserDate(JSON.parse(currentUserDate));
    }
  }, []);

  useEffect(() => {
    if (username !== "") {
      localStorage.setItem("currentUserId", JSON.stringify(userId));
      localStorage.setItem("currentUsername", JSON.stringify(username));
      localStorage.setItem("currentUserEmail", JSON.stringify(userEmail));
      localStorage.setItem("currentUserPassword", JSON.stringify(userPassword));
      localStorage.setItem("currentUserDate", JSON.stringify(userDate));
    }
  }, [username, userEmail]);

  const [genreType, setGenreType] = useState("");
  const [genreIds, setGenreIds] = useState(0);

  const handleGenre = (type: string, genreId: number) => {
    setGenreType(type);
    setGenreIds(genreId);
    console.log("type:", type);
    console.log("id:", genreId);
    setPage("Browse");
  };
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    width > 750 && setMenu(false);
  }, [width])
  return (
    <div
      className={clsx(
        "flex flex-col justify-start items-center",
        "w-full h-auto min-h-screen",
        "bg-top bg-cover bg-no-repeat"
      )}
      style={{ backgroundImage: `url(${bgHome.src})` }}
    >
      <header
        className={clsx(
          "fixed",
          "flex flex-col justify-between items-center",
          "w-full h-auto px-[9%] py-[2rem]",
          "backdrop-blur-[5rem]",
          "shadow-[0_2px_5px_rgba(0,0,0.2)]",
          "gap-5",
          "z-3"
        )}
      >
        <div
          className={clsx(
            "flex flex-row justify-between items-center",
            "w-full h-auto"
          )}
        >
          <h1
            className={clsx(
              "text-white text-[3rem]",
              "text-shadow-[0_0_5px_rgba(0,0,0.2)]"
            )}
          >
            CineM
            <i
              className={clsx("bx bx-play-circle", "text-red-300 text-[2rem]")}
            ></i>
            rket
          </h1>
          {width >= 750 ? (
            <nav
              className={clsx(
                "flex flex-row justify-center items-center",
                "text-[1.5rem]",
                "gap-3"
              )}
            >
              <a
                className={clsx(
                  "header",
                  page === "Home" &&
                    "text-red-500 text-shadow-[0_0_5px_rgba(0,0,0.2)]"
                )}
                onClick={() => setPage("Home")}
              >
                <span
                  className={clsx(
                    "bx bx-home",
                    "flex justify-center items-center",
                    "w-auto h-auto p-1",
                    "text-[1.8rem]"
                  )}
                ></span>
                <span
                  className={clsx(
                    "flex justify-center items-center",
                    "w-auto h-auto p-1"
                  )}
                >
                  Home
                </span>
              </a>
              <a
                className={clsx(
                  "header",
                  page === "Browse" &&
                    "text-red-500 text-shadow-[0_0_5px_rgba(0,0,0.2)]"
                )}
                onClick={() => setPage("Browse")}
              >
                <span
                  className={clsx(
                    "bx bx-window",
                    "flex justify-center items-center",
                    "w-auto h-auto p-1",
                    "text-[1.8rem]"
                  )}
                ></span>
                <span
                  className={clsx(
                    "flex justify-center items-center",
                    "w-auto h-auto p-1"
                  )}
                >
                  Browse
                </span>
              </a>
              <a
                className={clsx(
                  "header",
                  page === "Search" &&
                    "text-red-500 text-shadow-[0_0_5px_rgba(0,0,0.2)]"
                )}
                onClick={() => setPage("Search")}
              >
                <span
                  className={clsx(
                    "bx bx-search-alt",
                    "flex justify-center items-center",
                    "w-auto h-auto p-1",
                    "text-[1.8rem]"
                  )}
                ></span>
                <span
                  className={clsx(
                    "flex justify-center items-center",
                    "w-auto h-auto p-1"
                  )}
                >
                  Search
                </span>
              </a>
              {username !== "" && (
                <a
                  className={clsx(
                    "header",
                    page === "Favorites" &&
                      "text-red-500 text-shadow-[0_0_5px_rgba(0,0,0.2)]"
                  )}
                  onClick={() => setPage("Favorites")}
                >
                  <span
                    className={clsx(
                      "bx bxs-movie",
                      "flex justify-center items-center",
                      "w-auto h-auto p-1",
                      "text-[1.8rem]"
                    )}
                  ></span>
                  <span
                    className={clsx(
                      "flex justify-center items-center",
                      "w-auto h-auto p-1"
                    )}
                  >
                    Favorites
                  </span>
                </a>
              )}
              {username !== "" ? (
                <a
                  className={clsx("header")}
                  onClick={() => setViewAccount(true)}
                >
                  <span className={clsx("text-[1.5rem]", "p-1")}>
                    {username}
                  </span>
                </a>
              ) : (
                <a className={clsx("header")} onClick={() => setPage("Login")}>
                  <span className={clsx("bx bx-user", "text-[3rem]")}></span>
                </a>
              )}
            </nav>
          ) : (
            <div
              className={clsx(
                "flex flex-row justify-center items-center",
                "text-white text-[3rem]",
                "gap-3"
              )}
              onClick={() => menu ? setMenu(false) : setMenu(true)}
            >
              <i
                className={clsx(
                  menu ? "bx bx-x" :"bx bx-menu",
                  "cursor-pointer",
                  "transition-all duration-300 ease-in-out",
                  "hover:text-red-500"
                )}
              ></i>
            </div>
          )}
        </div>
        {menu && (
          <div
            className={clsx(
              "flex flex-col justify-center items-center",
              "w-full h-auto"
            )}
          >
            <nav
              className={clsx(
                "flex flex-row flex-wrap justify-center items-center",
                "text-[1.5rem]",
                "gap-3"
              )}
            >
              <a
                className={clsx(
                  "header",
                  page === "Home" &&
                    "text-red-500 text-shadow-[0_0_5px_rgba(0,0,0.2)]"
                )}
                onClick={() => setPage("Home")}
              >
                <span
                  className={clsx(
                    "bx bx-home",
                    "flex justify-center items-center",
                    "w-auto h-auto p-1",
                    "text-[1.8rem]"
                  )}
                ></span>
                <span
                  className={clsx(
                    "flex justify-center items-center",
                    "w-auto h-auto p-1"
                  )}
                >
                  Home
                </span>
              </a>
              <a
                className={clsx(
                  "header",
                  page === "Browse" &&
                    "text-red-500 text-shadow-[0_0_5px_rgba(0,0,0.2)]"
                )}
                onClick={() => setPage("Browse")}
              >
                <span
                  className={clsx(
                    "bx bx-window",
                    "flex justify-center items-center",
                    "w-auto h-auto p-1",
                    "text-[1.8rem]"
                  )}
                ></span>
                <span
                  className={clsx(
                    "flex justify-center items-center",
                    "w-auto h-auto p-1"
                  )}
                >
                  Browse
                </span>
              </a>
              <a
                className={clsx(
                  "header",
                  page === "Search" &&
                    "text-red-500 text-shadow-[0_0_5px_rgba(0,0,0.2)]"
                )}
                onClick={() => setPage("Search")}
              >
                <span
                  className={clsx(
                    "bx bx-search-alt",
                    "flex justify-center items-center",
                    "w-auto h-auto p-1",
                    "text-[1.8rem]"
                  )}
                ></span>
                <span
                  className={clsx(
                    "flex justify-center items-center",
                    "w-auto h-auto p-1"
                  )}
                >
                  Search
                </span>
              </a>
              {username !== "" && (
                <a
                  className={clsx(
                    "header",
                    page === "Favorites" &&
                      "text-red-500 text-shadow-[0_0_5px_rgba(0,0,0.2)]"
                  )}
                  onClick={() => setPage("Favorites")}
                >
                  <span
                    className={clsx(
                      "bx bxs-movie",
                      "flex justify-center items-center",
                      "w-auto h-auto p-1",
                      "text-[1.8rem]"
                    )}
                  ></span>
                  <span
                    className={clsx(
                      "flex justify-center items-center",
                      "w-auto h-auto p-1"
                    )}
                  >
                    Favorites
                  </span>
                </a>
              )}
              {username !== "" ? (
                <a
                  className={clsx("header")}
                  onClick={() => setViewAccount(true)}
                >
                  <span className={clsx("text-[1.5rem]", "p-1")}>
                    {username}
                  </span>
                </a>
              ) : (
                <a className={clsx("header")} onClick={() => setPage("Login")}>
                  <span className={clsx("bx bx-user", "text-[3rem]")}></span>
                </a>
              )}
            </nav>
          </div>
        )}
      </header>
      <div
        className={clsx(
          "flex flex-col justify-center items-center",
          "w-full h-auto min-h-screen",
          "bg-black/40"
        )}
      >
        {page === "Login" && (
          <Login onExit={handleExit} onLogin={handleLogin}></Login>
        )}
        {changeInfo && (
          <ChangeInfo
            infoType={changeInfoType}
            emailValue={userEmail}
            passwordValue={userPassword}
            userId={userId}
            onInfoChange={handleInfoChange}
            onExit={handleInfoExit}
          ></ChangeInfo>
        )}
        <div
          className={clsx(
            "fixed",
            "inset-0",
            "w-full h-auto min-h-screen",
            "backdrop-blur-[.2rem]",
            "z-4",
            "transition-opacity duration-300 ease-in-out",
            viewAccount
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div
            className={clsx(
              "fixed",
              "right-0",
              "flex flex-col justify-start item-center",
              "w-[35rem] h-screen",
              "text-white",
              "bg-black/90",
              "overflow-hidden",
              "transform transition-transform duration-500 ease-in-out",
              viewAccount ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div
              className={clsx(
                "flex flex-row justify-between items-center",
                "w-full h-[8.5rem]",
                "px-[3rem]",
                "shadow-[0_2px_5px_white]",
                "text-[2rem]"
              )}
            >
              <h1 className={clsx("w-auto h-auto p-5")}>My Account</h1>
              <p
                className={clsx(
                  "bx bx-x",
                  "cursor-pointer",
                  "w-auto h-auto p-5",
                  "rounded-[1rem]",
                  "transition-all duration-300 ease-in-out",
                  "hover:bg-slate-200 hover:text-red-500"
                )}
                onClick={() => setViewAccount(false)}
              ></p>
            </div>
            <div
              className={clsx(
                "flex flex-col justify-center items-center",
                "w-full h-auto",
                "mt-[5rem]",
                "text-[1.5rem]",
                "gap-3",
                "px-10"
              )}
            >
              <span
                className={clsx(
                  "flex flex-row justify-between items-center",
                  "w-full h-auto"
                )}
              >
                <h1>Username:</h1>
                <h1>{username}</h1>
              </span>
              <span
                className={clsx(
                  "flex flex-row justify-between items-center",
                  "w-full h-auto"
                )}
              >
                <h1>Email Address:</h1>
                <h1>{userEmail}</h1>
              </span>
              <span
                className={clsx(
                  "flex flex-row justify-between items-center",
                  "w-full h-auto"
                )}
              >
                <h1>Date Created:</h1>
                <h1>{userDate}</h1>
              </span>
            </div>
            <div
              className={clsx(
                "flex flex-col justify-center items-center",
                "w-full h-auto px-20",
                "mt-[5rem]",
                "text-[1.5rem]",
                "gap-10"
              )}
            >
              <div
                className={clsx(
                  "flex flex-row justify-center items-center",
                  "w-full h-auto py-5",
                  "cursor-pointer",
                  "border-red-500 border-solid border-[.2rem]",
                  "bg-black",
                  "transition-all duration-300 ease-in-out",
                  "hover:shadow-[0_0_8px_#fb2c36]",
                  "rounded-[1rem]",
                  emailCursorIn ? "text-red-500" : "text-white"
                )}
                onMouseEnter={() => setEmailCursorIn(true)}
                onMouseLeave={() => setEmailCursorIn(false)}
                onClick={() => {
                  setChangeInfoType("email");
                  setChangeInfo(true);
                }}
              >
                <i
                  className={clsx(
                    "bx bxs-envelope",
                    "w-[20%] h-auto",
                    "text-center"
                  )}
                ></i>
                <div className={clsx("w-[80%] h-auto")}>Change Email</div>
              </div>
              <div
                className={clsx(
                  "flex flex-row justify-center items-center",
                  "w-full h-auto py-5",
                  "cursor-pointer",
                  "border-red-500 border-solid border-[.2rem]",
                  "bg-black",
                  "transition-all duration-300 ease-in-out",
                  "hover:shadow-[0_0_8px_#fb2c36]",
                  "rounded-[1rem]",
                  passwordCursorIn ? "text-red-500" : "text-white"
                )}
                onMouseEnter={() => setPasswordCursorIn(true)}
                onMouseLeave={() => setPasswordCursorIn(false)}
                onClick={() => {
                  setChangeInfoType("password");
                  setChangeInfo(true);
                }}
              >
                <i
                  className={clsx(
                    "bx bxs-lock-alt",
                    "w-[20%] h-auto",
                    "text-center"
                  )}
                ></i>
                <div className={clsx("w-[80%] h-auto")}>Change Password</div>
              </div>
            </div>
            <div
              className={clsx(
                "absolute",
                "bottom-0 right-0",
                "flex justify-center items-center",
                "w-[35rem] h-auto p-10",
                "text-white text-[2rem]"
              )}
            >
              <div
                className={clsx(
                  "flex flex-row justify-center items-center",
                  "w-full h-auto p-5",
                  "bg-red-500",
                  "rounded-[1rem]",
                  "cursor-pointer",
                  "transition-all duration-300 ease-in-out",
                  "hover:shadow-[inset_0_0_10px_rgba(0,0,0.8)]",
                  "gap-5"
                )}
                onClick={() => handleLogout()}
              >
                <i className={clsx("bx bx-log-out")}></i>
                <p className={clsx("w-full, h-auto")}>Logout</p>
              </div>
            </div>
          </div>
        </div>
        {page === "Search" && (
          <Search
            userId={userId}
            username={username}
            onGenre={handleGenre}
          ></Search>
        )}
        {page === "Home" && (
          <Home
            userId={userId}
            username={username}
            onGenre={handleGenre}
          ></Home>
        )}
        {page === "Browse" && (
          <Browse
            userId={userId}
            username={username}
            genreType={genreType}
            genreId={genreIds}
          ></Browse>
        )}
        {page === "Favorites" && (
          <Favorite
            userId={userId}
            username={username}
            onGenre={handleGenre}
          ></Favorite>
        )}
      </div>
    </div>
  );
}
