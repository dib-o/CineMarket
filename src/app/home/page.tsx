"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import notFound from "@/bg/404.jpg";
import FireParticles from "../component/particles";
import View from "./view/page";
import bgHome from "@/bg/home.jpg";
export default function Home({
  userId,
  username,
  onGenre,
}: {
  userId: number;
  username: string;
  onGenre: (type: string, genreId: number) => void;
}) {
  const [todayMovieTrends, setTodayMovieTrends] = useState<any[]>([]);
  const [weekMovieTrends, setWeekMovieTrends] = useState<any[]>([]);
  const [viewResultTodaysMovie, setViewResultTodaysMovie] = useState<
    number | null
  >(null);
  const [viewResultWeekMovie, setViewResultWeeksMovie] = useState<
    number | null
  >(null);
  const [todayTvTrends, setTodayTvTrends] = useState<any[]>([]);
  const [weekTvTrends, setWeekTvTrends] = useState<any[]>([]);
  const [viewResultTodayTv, setViewResultTodayTv] = useState<number | null>(
    null
  );
  const [viewResultWeekTv, setViewResultWeekTv] = useState<number | null>(null);
  const [view, setView] = useState<number | null>(null);
  const [viewContents, setViewCOntents] = useState<any[]>([]);

  const [value, setValue] = useState<number[]>([-1, 4, 9]);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (width >= 1281) {
      setValue([-1, 4, 9]);
    }
    if (width <= 1280 && width > 1100) {
      setValue([-1, 3, 7, 9]);
    } else if (width <= 1100 && width > 900) {
      setValue([-1, 2, 5, 8, 9]);
    } else if (width <= 900 && width > 700) {
      setValue([-1, 1, 3, 5, 7, 9]);
    } else if (width <= 700) {
      setValue([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    }
    setTodayMNum(0);
    setTodayTNum(0);
    setWeekMNum(0);
    setWeekTNum(0);
  }, [width]);
  const [todayMNum, setTodayMNum] = useState(0);
  const [todayTNum, setTodayTNum] = useState(0);
  const [weekMNum, setWeekMNum] = useState(0);
  const [weekTNum, setWeekTNum] = useState(0);
  const handleResetView = (resetView: number) => {
    setView(null);
    setTimeout(() => {
      const res = document.getElementById("results");
      res?.scrollIntoView();
    }, 500);
  };

  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const BASE_URL = "https://api.themoviedb.org/3";

    const getTrends = async () => {
      try {
        const dailyResMovie = await fetch(
          `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
        );
        const dailyDataMovie = await dailyResMovie.json();
        const weeklyResMovie = await fetch(
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
        );
        const weeklyDataMovie = await weeklyResMovie.json();
        const top10MovieToday = dailyDataMovie.results?.slice(0, 10) || [];
        const top10MovieWeek = weeklyDataMovie.results?.slice(0, 10) || [];
        setTodayMovieTrends(top10MovieToday);
        setWeekMovieTrends(top10MovieWeek);
        const dailyResTv = await fetch(
          `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`
        );
        const dailyDataTv = await dailyResTv.json();
        const weeklyResTv = await fetch(
          `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
        );
        const weeklyDataTv = await weeklyResTv.json();
        const top10TvToday = dailyDataTv.results?.slice(0, 10) || [];
        const top10TvWeek = weeklyDataTv.results?.slice(0, 10) || [];
        setTodayTvTrends(top10TvToday);
        setWeekTvTrends(top10TvWeek);
      } catch (err) {
        console.error("Error fetching trending:", err);
      }
    };

    getTrends();
  }, []);

  const handleGenre = (type: string, genreId: number) => {
    onGenre(type, genreId);
  };
  return (
    <div
      className={clsx(
        "flex flex-col justify-center items-center",
        "w-full h-auto min-h-screen"
      )}
    >
      <div
        className={clsx(
          "flex flex-col justify-center items-center",
          "w-full h-auto"
        )}
      >
        <div className="absolute inset-0">
          <FireParticles />
        </div>
        {view === null && (
          <div
            className={clsx(
              "flex flex-col justify-center items-center",
              "w-full h-auto min-h-screen",
              "bg-center bg-cover bg-no-repeat"
            )}
            style={{ backgroundImage: `url(${bgHome.src})` }}
          >
            <div
              className={clsx(
                "flex flex-col justify-center items-center",
                "w-full h-auto min-h-screen px-[8.5%]",
                "bg-black/70",
                "gap-10"
              )}
            >
              <h1
                className={clsx(
                  "text-white text-[5rem] text-center",
                  "mt-[3rem]",
                  "uppercase",
                  "text-shadow-[2px_2px_5px_#fb2c36]"
                )}
                style={{ WebkitTextStroke: "1.5px black" }}
              >
                Welcome {username}
              </h1>
              <p
                className={clsx(
                  "text-gray-200 text-[1.5rem] md:text-[2rem] mt-5",
                  "italic max-w-[60rem]"
                )}
              >
                “Your next favorite movie is waiting.
                <br />
                Explore, watch, and feel the story.”
              </p>
              <div
                className={clsx(
                  "flex flex-row flex-wrap justify-center items-center",
                  "w-full h-auto px-[5rem]",
                  "mt-[5rem]",
                  "gap-10"
                )}
              >
                <div className={clsx("home")}>
                  <p className={clsx("text-red-500 ")}>10K +</p>
                  <p>Movies & Series</p>
                </div>
                <div className={clsx("home")}>
                  <p className={clsx("text-red-500 ")}>24 / 7</p>
                  <p>Streaming Access</p>
                </div>
                <div className={clsx("home")}>
                  <p className={clsx("text-red-500 ")}>100 +</p>
                  <p>Genres & Categories</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          id="results"
          className={clsx(
            "flex flex-col justify-center items-center",
            "w-full h-auto min-h-screen px-[8.5%] pb-[5rem]",
            "bg-gradient-to-b from-black via-red-300 to-red-500",
            "gap-30"
          )}
        >
          {todayMovieTrends.length !== 0 && view === null && (
            <div
              className={clsx(
                "flex flex-col justify-start items-center",
                "w-full h-auto",
                "gap-10",
              )}
            >
              <h1 className={clsx("homeTitle")}>
                <i className={clsx("bx bxs-hot")}></i>
                <span>Today’s Movie Buzz</span>
              </h1>
              <ul
                className={clsx(
                  "relative",
                  "flex flex-row flex-wrap justify-center items-center",
                  "w-full h-auto",
                  "gap-10"
                )}
              >
                {todayMovieTrends.map(
                  (r: any, index) =>
                    index > value[todayMNum] &&
                    index <= value[todayMNum + 1] && (
                      <li
                        className={clsx(
                          "relative",
                          "flex flex-col justify-center items-center",
                          "w-[20rem] h-[30rem]",
                          "rounded-[1rem]",
                          "cursor-pointer",
                          "overflow-hidden",
                          "shadow-[0_0_5px_rgba(0,0,0.2)]"
                        )}
                        onMouseEnter={() => setViewResultTodaysMovie(index)}
                        onMouseLeave={() => setViewResultTodaysMovie(null)}
                        key={index}
                        onClick={() => {
                          setView(index);
                          setViewCOntents([
                            r.id,
                            r.name ? r.name : r.title,
                            r.vote_average,
                            r.backdrop_path,
                            r.media_type ? r.media_type : "tv",
                            r.overview,
                            r.poster_path,
                            r.release_date ? r.release_date : r.first_air_date,
                          ]);
                        }}
                      >
                        <div
                          className={clsx(
                            "absolute",
                            "inset-0",
                            "transition-all duration-300 ease-in-out",
                            viewResultTodaysMovie === index && "bg-black/70",
                            "z-1"
                          )}
                        ></div>
                        <img
                          className={clsx(
                            "w-full h-full",
                            "transition-transform duration-300 ease-in-out",
                            viewResultTodaysMovie === index && "scale-110"
                          )}
                          src={
                            r.poster_path
                              ? `https://image.tmdb.org/t/p/original${r.poster_path}`
                              : notFound.src
                          }
                          alt="poster"
                        />
                        <div
                          className={clsx(
                            "absolute",
                            "bottom-0",
                            "flex flex-col justify-center items-center",
                            "w-full h-auto p-5",
                            "transition-opacity duration-300 ease-in-out",
                            "z-2",
                            "text-white",
                            viewResultTodaysMovie === index
                              ? "opacity-100 pointer-events-auto"
                              : "opacity-0 pointer-events-none"
                          )}
                        >
                          <div
                            className={clsx(
                              "flex flex-col justify-center items-start",
                              "w-full h-auto",
                              "gap-5",
                              "text-shadow-[0_0_5px_white]",
                              "transform transition-transform duration-500 ease-in-out",
                              viewResultTodaysMovie === index
                                ? "translate-y-0"
                                : "translate-y-full"
                            )}
                          >
                            <p
                              className={clsx(
                                "flex justify-center items-center",
                                "text-white text-[5rem] text-center",
                                "w-full",
                                "text-shadow-[0_0_20px_#fb2c36]"
                              )}
                            >
                              {index + 1}
                            </p>
                            <p
                              className={clsx(
                                "text-[1.5rem] text-left",
                                "w-[90%]"
                              )}
                            >
                              {r.name ? r.name : r.title}
                            </p>
                            <div
                              className={clsx(
                                "flex flex-row justify-between items-center",
                                "w-full",
                                "text-[1.5rem]",
                                "uppercase"
                              )}
                            >
                              <p>{r.media_type ? r.media_type : "Tv"}</p>
                              <div
                                className={clsx(
                                  "flex flex-row justify-center items-center",
                                  "gap-1"
                                )}
                                title={`${(r.vote_average || 0).toFixed(
                                  1
                                )} / 10`}
                              >
                                <i
                                  className={clsx(
                                    "bx bxs-star",
                                    "flex justify-center items-center",
                                    "text-red-500 text-[1.3rem]",
                                    "h-auto p-1",
                                    "text-shadow-none"
                                  )}
                                ></i>
                                <p>
                                  {r.vote_average > 10
                                    ? 10
                                    : (r.vote_average || 0).toFixed(1)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                )}
                <div
                  className={clsx(
                    "absolute",
                    "flex flex-row justify-between items-center",
                    "w-full h-auto",
                    "text-white text-[5rem]"
                  )}
                >
                  <i
                    className={clsx(
                      "bx bx-chevron-left",
                      "arrows",
                      todayMNum === 0 && "pointer-events-none text-slate-500"
                    )}
                    onClick={() => setTodayMNum(todayMNum - 1)}
                  ></i>
                  <i
                    className={clsx(
                      "bx bx-chevron-right",
                      "arrows",
                      todayMNum === value.length - 2 &&
                        "pointer-events-none text-slate-500"
                    )}
                    onClick={() => setTodayMNum(todayMNum + 1)}
                  ></i>
                </div>
              </ul>
            </div>
          )}
          {todayTvTrends.length !== 0 && view === null && (
            <div
              className={clsx(
                "flex flex-col justify-start items-center",
                "w-full h-auto",
                "gap-10"
              )}
            >
              <h1 className={clsx("homeTitle")}>
                <i className={clsx("bx bxs-hot")}></i>
                <span>Today’s TV Spotlight</span>
              </h1>
              <ul
                className={clsx(
                  "relative",
                  "flex flex-row flex-wrap justify-center items-center",
                  "w-full h-auto",
                  "gap-10"
                )}
              >
                {todayTvTrends.map(
                  (r: any, index) =>
                    index > value[todayTNum] &&
                    index <= value[todayTNum + 1] && (
                      <li
                        className={clsx(
                          "relative",
                          "flex flex-col justify-center items-center",
                          "w-[20rem] h-[30rem]",
                          "rounded-[1rem]",
                          "cursor-pointer",
                          "overflow-hidden",
                          "shadow-[0_0_5px_rgba(0,0,0.2)]"
                        )}
                        onMouseEnter={() => setViewResultTodayTv(index)}
                        onMouseLeave={() => setViewResultTodayTv(null)}
                        key={index}
                        onClick={() => {
                          setView(index);
                          setViewCOntents([
                            r.id,
                            r.name ? r.name : r.title,
                            r.vote_average,
                            r.backdrop_path,
                            r.media_type ? r.media_type : "tv",
                            r.overview,
                            r.poster_path,
                            r.release_date ? r.release_date : r.first_air_date,
                          ]);
                        }}
                      >
                        <div
                          className={clsx(
                            "absolute",
                            "inset-0",
                            "transition-all duration-300 ease-in-out",
                            viewResultTodayTv === index && "bg-black/70",
                            "z-1"
                          )}
                        ></div>
                        <img
                          className={clsx(
                            "w-full h-full",
                            "transition-transform duration-300 ease-in-out",
                            viewResultTodayTv === index && "scale-110"
                          )}
                          src={
                            r.poster_path
                              ? `https://image.tmdb.org/t/p/original${r.poster_path}`
                              : notFound.src
                          }
                          alt="poster"
                        />
                        <div
                          className={clsx(
                            "absolute",
                            "bottom-0",
                            "flex flex-col justify-center items-center",
                            "w-full h-auto p-5",
                            "transition-opacity duration-300 ease-in-out",
                            "z-2",
                            "text-white",
                            viewResultTodayTv === index
                              ? "opacity-100 pointer-events-auto"
                              : "opacity-0 pointer-events-none"
                          )}
                        >
                          <div
                            className={clsx(
                              "flex flex-col justify-center items-start",
                              "w-full h-auto",
                              "gap-5",
                              "text-shadow-[0_0_5px_white]",
                              "transform transition-transform duration-500 ease-in-out",
                              viewResultTodayTv === index
                                ? "translate-y-0"
                                : "translate-y-full"
                            )}
                          >
                            <p
                              className={clsx(
                                "flex justify-center items-center",
                                "text-white text-[5rem] text-center",
                                "w-full",
                                "text-shadow-[0_0_20px_#fb2c36]"
                              )}
                            >
                              {index + 1}
                            </p>
                            <p
                              className={clsx(
                                "text-[1.5rem] text-left",
                                "w-[90%]"
                              )}
                            >
                              {r.name ? r.name : r.title}
                            </p>
                            <div
                              className={clsx(
                                "flex flex-row justify-between items-center",
                                "w-full",
                                "text-[1.5rem]",
                                "uppercase"
                              )}
                            >
                              <p>{r.media_type ? r.media_type : "Tv"}</p>
                              <div
                                className={clsx(
                                  "flex flex-row justify-center items-center",
                                  "gap-1"
                                )}
                                title={`${(r.vote_average || 0).toFixed(
                                  1
                                )} / 10`}
                              >
                                <i
                                  className={clsx(
                                    "bx bxs-star",
                                    "flex justify-center items-center",
                                    "text-red-500 text-[1.3rem]",
                                    "h-auto p-1",
                                    "text-shadow-none"
                                  )}
                                ></i>
                                <p>
                                  {r.vote_average > 10
                                    ? 10
                                    : (r.vote_average || 0).toFixed(1)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                )}
                <div
                  className={clsx(
                    "absolute",
                    "flex flex-row justify-between items-center",
                    "w-full h-auto",
                    "text-white text-[5rem]"
                  )}
                >
                  <i
                    className={clsx(
                      "bx bx-chevron-left",
                      "arrows",
                      todayTNum === 0 && "pointer-events-none text-slate-500"
                    )}
                    onClick={() => setTodayTNum(todayTNum - 1)}
                  ></i>
                  <i
                    className={clsx(
                      "bx bx-chevron-right",
                      "arrows",
                      todayTNum === value.length - 2 && "pointer-events-none text-slate-500"
                    )}
                    onClick={() => setTodayTNum(todayTNum + 1)}
                  ></i>
                </div>
              </ul>
            </div>
          )}
          {weekMovieTrends.length !== 0 && view === null && (
            <div
              className={clsx(
                "flex flex-col justify-start items-center",
                "w-full h-auto",
                "gap-10"
              )}
            >
              <h1 className={clsx("homeTitle")}>
                <i className={clsx("bx bxs-hot")}></i>
                <span>Week's Film Fever</span>
              </h1>
              <ul
                className={clsx(
                  "relative",
                  "flex flex-row flex-wrap justify-center items-center",
                  "w-full h-auto",
                  "gap-10"
                )}
              >
                {weekMovieTrends.map(
                  (r: any, index) =>
                    index > value[weekMNum] &&
                    index <= value[weekMNum + 1] && (
                      <li
                        className={clsx(
                          "relative",
                          "flex flex-col justify-center items-center",
                          "w-[20rem] h-[30rem]",
                          "rounded-[1rem]",
                          "cursor-pointer",
                          "overflow-hidden",
                          "shadow-[0_0_5px_rgba(0,0,0.2)]"
                        )}
                        onMouseEnter={() => setViewResultWeeksMovie(index)}
                        onMouseLeave={() => setViewResultWeeksMovie(null)}
                        key={index}
                        onClick={() => {
                          setView(index);
                          setViewCOntents([
                            r.id,
                            r.name ? r.name : r.title,
                            r.vote_average,
                            r.backdrop_path,
                            r.media_type ? r.media_type : "tv",
                            r.overview,
                            r.poster_path,
                            r.release_date ? r.release_date : r.first_air_date,
                          ]);
                        }}
                      >
                        <div
                          className={clsx(
                            "absolute",
                            "inset-0",
                            "transition-all duration-300 ease-in-out",
                            viewResultWeekMovie === index && "bg-black/70",
                            "z-1"
                          )}
                        ></div>
                        <img
                          className={clsx(
                            "w-full h-full",
                            "transition-transform duration-300 ease-in-out",
                            viewResultWeekMovie === index && "scale-110"
                          )}
                          src={
                            r.poster_path
                              ? `https://image.tmdb.org/t/p/original${r.poster_path}`
                              : notFound.src
                          }
                          alt="poster"
                        />
                        <div
                          className={clsx(
                            "absolute",
                            "bottom-0",
                            "flex flex-col justify-center items-center",
                            "w-full h-auto p-5",
                            "transition-opacity duration-300 ease-in-out",
                            "z-2",
                            "text-white",
                            viewResultWeekMovie === index
                              ? "opacity-100 pointer-events-auto"
                              : "opacity-0 pointer-events-none"
                          )}
                        >
                          <div
                            className={clsx(
                              "flex flex-col justify-center items-start",
                              "w-full h-auto",
                              "gap-5",
                              "text-shadow-[0_0_5px_white]",
                              "transform transition-transform duration-500 ease-in-out",
                              viewResultWeekMovie === index
                                ? "translate-y-0"
                                : "translate-y-full"
                            )}
                          >
                            <p
                              className={clsx(
                                "flex justify-center items-center",
                                "text-white text-[5rem] text-center",
                                "w-full",
                                "text-shadow-[0_0_20px_#fb2c36]"
                              )}
                            >
                              {index + 1}
                            </p>
                            <p
                              className={clsx(
                                "text-[1.5rem] text-left",
                                "w-[90%]"
                              )}
                            >
                              {r.name ? r.name : r.title}
                            </p>
                            <div
                              className={clsx(
                                "flex flex-row justify-between items-center",
                                "w-full",
                                "text-[1.5rem]",
                                "uppercase"
                              )}
                            >
                              <p>{r.media_type ? r.media_type : "Tv"}</p>
                              <div
                                className={clsx(
                                  "flex flex-row justify-center items-center",
                                  "gap-1"
                                )}
                                title={`${(r.vote_average || 0).toFixed(
                                  1
                                )} / 10`}
                              >
                                <i
                                  className={clsx(
                                    "bx bxs-star",
                                    "flex justify-center items-center",
                                    "text-red-500 text-[1.3rem]",
                                    "h-auto p-1",
                                    "text-shadow-none"
                                  )}
                                ></i>
                                <p>
                                  {r.vote_average > 10
                                    ? 10
                                    : (r.vote_average || 0).toFixed(1)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                )}
                <div
                  className={clsx(
                    "absolute",
                    "flex flex-row justify-between items-center",
                    "w-full h-auto",
                    "text-white text-[5rem]"
                  )}
                >
                  <i
                    className={clsx(
                      "bx bx-chevron-left",
                      "arrows",
                      weekMNum === 0 && "pointer-events-none text-slate-500"
                    )}
                    onClick={() => setWeekMNum(weekMNum - 1)}
                  ></i>
                  <i
                    className={clsx(
                      "bx bx-chevron-right",
                      "arrows",
                      weekMNum === value.length - 2 && "pointer-events-none text-slate-500"
                    )}
                    onClick={() => setWeekMNum(weekMNum + 1)}
                  ></i>
                </div>
              </ul>
            </div>
          )}
          {weekTvTrends.length !== 0 && view === null && (
            <div
              className={clsx(
                "flex flex-col justify-start items-center",
                "w-full h-auto",
                "gap-10"
              )}
            >
              <h1 className={clsx("homeTitle")}>
                <i className={clsx("bx bxs-hot")}></i>
                <span>Week’s Hottest Series</span>
              </h1>
              <ul
                className={clsx(
                  "relative",
                  "flex flex-row flex-wrap justify-center items-center",
                  "w-full h-auto",
                  "gap-10"
                )}
              >
                {weekTvTrends.map(
                  (r: any, index) =>
                    index > value[weekTNum] &&
                    index <= value[weekTNum + 1] && (
                      <li
                        className={clsx(
                          "relative",
                          "flex flex-col justify-center items-center",
                          "w-[20rem] h-[30rem]",
                          "rounded-[1rem]",
                          "cursor-pointer",
                          "overflow-hidden",
                          "shadow-[0_0_5px_rgba(0,0,0.2)]"
                        )}
                        onMouseEnter={() => setViewResultWeekTv(index)}
                        onMouseLeave={() => setViewResultWeekTv(null)}
                        key={index}
                        onClick={() => {
                          setView(index);
                          setViewCOntents([
                            r.id,
                            r.name ? r.name : r.title,
                            r.vote_average,
                            r.backdrop_path,
                            r.media_type ? r.media_type : "tv",
                            r.overview,
                            r.poster_path,
                            r.release_date ? r.release_date : r.first_air_date,
                          ]);
                        }}
                      >
                        <div
                          className={clsx(
                            "absolute",
                            "inset-0",
                            "transition-all duration-300 ease-in-out",
                            viewResultWeekTv === index && "bg-black/70",
                            "z-1"
                          )}
                        ></div>
                        <img
                          className={clsx(
                            "w-full h-full",
                            "transition-transform duration-300 ease-in-out",
                            viewResultWeekTv === index && "scale-110"
                          )}
                          src={
                            r.poster_path
                              ? `https://image.tmdb.org/t/p/original${r.poster_path}`
                              : notFound.src
                          }
                          alt="poster"
                        />
                        <div
                          className={clsx(
                            "absolute",
                            "bottom-0",
                            "flex flex-col justify-center items-center",
                            "w-full h-auto p-5",
                            "transition-opacity duration-300 ease-in-out",
                            "z-2",
                            "text-white",
                            viewResultWeekTv === index
                              ? "opacity-100 pointer-events-auto"
                              : "opacity-0 pointer-events-none"
                          )}
                        >
                          <div
                            className={clsx(
                              "flex flex-col justify-center items-start",
                              "w-full h-auto",
                              "gap-5",
                              "text-shadow-[0_0_5px_white]",
                              "transform transition-transform duration-500 ease-in-out",
                              viewResultWeekTv === index
                                ? "translate-y-0"
                                : "translate-y-full"
                            )}
                          >
                            <p
                              className={clsx(
                                "flex justify-center items-center",
                                "text-white text-[5rem] text-center",
                                "w-full",
                                "text-shadow-[0_0_20px_#fb2c36]"
                              )}
                            >
                              {index + 1}
                            </p>
                            <p
                              className={clsx(
                                "text-[1.5rem] text-left",
                                "w-[90%]"
                              )}
                            >
                              {r.name ? r.name : r.title}
                            </p>
                            <div
                              className={clsx(
                                "flex flex-row justify-between items-center",
                                "w-full",
                                "text-[1.5rem]",
                                "uppercase"
                              )}
                            >
                              <p>{r.media_type ? r.media_type : "Tv"}</p>
                              <div
                                className={clsx(
                                  "flex flex-row justify-center items-center",
                                  "gap-1"
                                )}
                                title={`${(r.vote_average || 0).toFixed(
                                  1
                                )} / 10`}
                              >
                                <i
                                  className={clsx(
                                    "bx bxs-star",
                                    "flex justify-center items-center",
                                    "text-red-500 text-[1.3rem]",
                                    "h-auto p-1",
                                    "text-shadow-none"
                                  )}
                                ></i>
                                <p>
                                  {r.vote_average > 10
                                    ? 10
                                    : (r.vote_average || 0).toFixed(1)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                )}
                <div
                  className={clsx(
                    "absolute",
                    "flex flex-row justify-between items-center",
                    "w-full h-auto",
                    "text-white text-[5rem]"
                  )}
                >
                  <i
                    className={clsx(
                      "bx bx-chevron-left",
                      "arrows",
                      weekTNum === 0 && "pointer-events-none text-slate-500"
                    )}
                    onClick={() => setWeekTNum(weekTNum - 1)}
                  ></i>
                  <i
                    className={clsx(
                      "bx bx-chevron-right",
                      "arrows",
                      weekTNum === value.length-2 && "pointer-events-none text-slate-500"
                    )}
                    onClick={() => setWeekTNum(weekTNum + 1)}
                  ></i>
                </div>
              </ul>
            </div>
          )}
        </div>
        {view !== null && (
          <View
            userId={userId}
            username={username}
            id={viewContents[0]}
            name={viewContents[1]}
            ratings={viewContents[2]}
            backdrop={viewContents[3]}
            type={viewContents[4]}
            overview={viewContents[5]}
            poster={viewContents[6]}
            date={viewContents[7]}
            onBack={handleResetView}
            onGenre={handleGenre}
          ></View>
        )}
      </div>
    </div>
  );
}
