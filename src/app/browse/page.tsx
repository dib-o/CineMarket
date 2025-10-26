"use client";

import "boxicons/css/boxicons.min.css";
import clsx from "clsx";
import bg2 from "@/bg/bg2.jpg";
import notFound from "@/bg/404.jpg";
import { useState, useEffect, use } from "react";
import FireParticles from "../component/particles";
import View from "./view/page";
export default function Browse({
  userId,
  username,
  genreType,
  genreId,
}: {
  userId: number;
  username: string;
  genreType: string;
  genreId: number;
}) {
  const [movieGenres, setMovieGenres] = useState<any[]>([]);
  const [tvGenres, setTvGenres] = useState<any[]>([]);
  const [activeType, setActiveType] = useState("");
  const [activeGenre, setActiveGenre] = useState(0);
  const [movies, setMovies] = useState<any[]>([]);
  const [viewResult, setViewResult] = useState<number | null>(null);
  const [view, setView] = useState<number | null>(null);
  const [viewContents, setViewCOntents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const pageValues = [-1, 49, 99, 149, 199, 249, 299, 349, 399, 449, 499];
  const [pageNum, setPageNum] = useState(1);
  useEffect(() => {
    setMovieGenres([
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: 10751, name: "Family" },
      { id: 14, name: "Fantasy" },
      { id: 36, name: "History" },
      { id: 27, name: "Horror" },
      { id: 10402, name: "Music" },
      { id: 9648, name: "Mystery" },
      { id: 10749, name: "Romance" },
      { id: 878, name: "Science Fiction" },
      { id: 10770, name: "TV Movie" },
      { id: 53, name: "Thriller" },
      { id: 10752, name: "War" },
      { id: 37, name: "Western" },
    ]);

    setTvGenres([
      { id: 10759, name: "Action & Adventure" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: 10751, name: "Family" },
      { id: 10762, name: "Kids" },
      { id: 9648, name: "Mystery" },
      { id: 10763, name: "News" },
      { id: 10764, name: "Reality" },
      { id: 10765, name: "Sci-Fi & Fantasy" },
      { id: 10766, name: "Soap" },
      { id: 10767, name: "Talk" },
      { id: 10768, name: "War & Politics" },
      { id: 37, name: "Western" },
    ]);
  }, []);

  const getMovies = async (genreId: number, type: string) => {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const BASE_URL = "https://api.themoviedb.org/3";

    try {
      const promises = Array.from({ length: 25 }, (_, i) =>
        fetch(
          type === "Anime"
            ? `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&include_adult=true&sort_by=popularity.desc&page=${
                i + 1
              }`
            : `${BASE_URL}/discover/${type.toLowerCase()}?api_key=${API_KEY}&with_genres=${genreId}&include_adult=true&language=en-US&sort_by=popularity.desc&page=${
                i + 1
              }`
        ).then((res) => res.json())
      );

      const results = await Promise.all(promises);
      const combined = results.flatMap((r) => r.results ?? []);
      setMovies(combined);
      console.log(combined);
    } catch (err) {
      console.error("Error fetching from TMDB:", err);
    }
  };

  const handleResetView = () => {
    setView(null);
  };

  useEffect(() => {
    if (genreType !== "" && genreId !== 0) {
      setActiveType(genreType);
      setActiveGenre(genreId);
      getMovies(genreId, genreType);
    }
  }, [genreType, genreId]);

  const handleGenre = (type: string, genreId: number) => {
    setView(null);
    setActiveType(type);
    setActiveGenre(genreId);
    getMovies(genreId, type);
  };
  return (
    <div
      className={clsx(
        "relative",
        "flex flex-col justify-center items-center",
        "w-full h-auto min-h-screen",
        "bg-gradient-to-b from-black to-red-950"
        // "bg-top bg-cover bg-repeat-x",
      )}
      // style={{ backgroundImage: `url(${bg2.src})` }}
    >
      <div className="absolute inset-0">
        <FireParticles />
      </div>
      <div
        className={clsx(
          "flex flex-col justify-center items-center",
          "w-full h-auto min-h-screen px-[8.5%] pt-[12rem]",
          "bg-black/50",
          "z-1"
        )}
      >
        <div
          className={clsx(
            "flex flex-col justify-center items-center",
            "w-full h-auto pb-[5rem]",
            "gap-10"
          )}
        >
          <div
            className={clsx(
              "flex flex-row justify-center items-center",
              "w-full h-auto",
              "text-white",
              "gap-10"
            )}
          >
            <button
              className={clsx(
                "browse",
                activeType === "movie" && "shadow-[inset_0_0_20px_#fb2c36]"
              )}
              onClick={() => {
                setActiveType("movie");
                setActiveGenre(0);
                setMovies([]);
              }}
            >
              <i
                className={clsx(
                  "bx bxs-movie-play",
                  "flex justify-center items-center",
                  "w-auto h-auto"
                )}
              ></i>
              <p
                className={clsx(
                  "flex justify-center items-center",
                  "w-auto h-auto"
                )}
              >
                Movie
              </p>
            </button>
            <button
              className={clsx(
                "browse",
                activeType === "tv" && "shadow-[inset_0_0_20px_#fb2c36]"
              )}
              onClick={() => {
                setActiveType("tv");
                setActiveGenre(0);
                setMovies([]);
              }}
            >
              <i
                className={clsx(
                  "bx bxs-tv",
                  "flex justify-center items-center",
                  "w-auto h-auto"
                )}
              ></i>
              <p
                className={clsx(
                  "flex justify-center items-center",
                  "w-auto h-auto"
                )}
              >
                Tv
              </p>
            </button>
            <button
              className={clsx(
                "browse",
                activeType === "Anime" && "shadow-[inset_0_0_20px_#fb2c36] "
              )}
              onClick={() => {
                setActiveType("Anime");
                setActiveGenre(0);
                setPageNum(1);
                setMovies([]);
                getMovies(16, "Anime");
              }}
            >
              <i
                className={clsx(
                  "bx bx-mask",
                  "flex justify-center items-center",
                  "w-auto h-auto"
                )}
              ></i>
              <p
                className={clsx(
                  "flex justify-center items-center",
                  "w-auto h-auto"
                )}
              >
                Anime
              </p>
            </button>
          </div>
          <ul
            className={clsx(
              "flex flex-row flex-wrap justify-center items-center",
              "w-full h-auto p-5",
              "gap-10"
            )}
          >
            {activeType === "movie" &&
              movieGenres.map((m: any, index) => (
                <li
                  key={index}
                  className={clsx(
                    "text-[1rem] text-white text-center",
                    "w-auto min-w-[10rem] h-auto p-5",
                    "cursor-pointer",
                    "uppercase",
                    "rounded-[1rem]",
                    "text-shadow-[2px_2px_5px_black]",
                    "border-b-transparent border-solid border-b-[.2rem]",
                    "transition-all duration-300 ease-in-out",
                    "hover:shadow-[0_0_5px_rgba(0,0,0.2)] hover:bg-red-500",
                    activeGenre === m.id && "bg-red-500"
                  )}
                  onClick={() => {
                    setActiveGenre(m.id);
                    setPageNum(1);
                    getMovies(m.id, "movie");
                  }}
                >
                  {m.name}
                </li>
              ))}
            {activeType === "tv" &&
              tvGenres.map((m: any, index) => (
                <li
                  key={index}
                  className={clsx(
                    "text-[1rem] text-white text-center",
                    "w-auto min-w-[10rem] h-auto p-5",
                    "cursor-pointer",
                    "uppercase",
                    "rounded-[1rem]",
                    "text-shadow-[2px_2px_5px_black]",
                    "border-b-transparent border-solid border-b-[.2rem]",
                    "transition-all duration-300 ease-in-out",
                    "hover:shadow-[0_0_5px_rgba(0,0,0.2)] hover:bg-red-500",
                    activeGenre === m.id && "bg-red-500"
                  )}
                  onClick={() => {
                    setActiveGenre(m.id);
                    setPageNum(1);
                    getMovies(m.id, "tv");
                  }}
                >
                  {m.name}
                </li>
              ))}
          </ul>
          {movies.length !== 0 && view === null && (
            <ul
              className={clsx(
                "flex flex-row flex-wrap justify-center items-center",
                "w-full h-auto",
                "gap-10"
              )}
            >
              {movies.map(
                (m: any, index) =>
                  index > pageValues[pageNum - 1] &&
                  index <= pageValues[pageNum] && (
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
                      onMouseEnter={() => setViewResult(index)}
                      onMouseLeave={() => setViewResult(null)}
                      key={index}
                      onClick={() => {
                        setView(index);
                        setViewCOntents([
                          m.id,
                          m.name ? m.name : m.title,
                          m.vote_average,
                          m.backdrop_path,
                          activeType === "Anime"
                            ? "tv"
                            : activeType.toLowerCase(),
                          m.overview,
                          m.poster_path,
                          m.release_date ? m.release_date : m.first_air_date,
                        ]);
                      }}
                    >
                      <div
                        className={clsx(
                          "absolute",
                          "inset-0",
                          "transition-all duration-300 ease-in-out",
                          viewResult === index && "bg-black/70",
                          "z-1"
                        )}
                      ></div>
                      <img
                        className={clsx(
                          "w-full h-full",
                          "transition-transform duration-300 ease-in-out",
                          viewResult === index && "scale-110"
                        )}
                        src={
                          m.poster_path
                            ? `https://image.tmdb.org/t/p/original${m.poster_path}`
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
                          viewResult === index
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
                            viewResult === index
                              ? "translate-y-0"
                              : "translate-y-full"
                          )}
                        >
                          <p
                            className={clsx(
                              "text-[1.5rem] text-left",
                              "w-[90%]"
                            )}
                          >
                            {m.name ? m.name : m.title}
                          </p>
                          <div
                            className={clsx(
                              "flex flex-row justify-between items-center",
                              "w-full",
                              "text-[1.5rem]",
                              "uppercase"
                            )}
                          >
                            <p>{activeType === "Anime" ? "Tv" : activeType}</p>
                            <div
                              className={clsx(
                                "flex flex-row justify-center items-center",
                                "gap-1"
                              )}
                              title={`${(m.vote_average || 0).toFixed(1)} / 10`}
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
                                {m.vote_average > 10
                                  ? 10
                                  : (m.vote_average || 0).toFixed(1)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
              )}
            </ul>
          )}
          {movies.length !== 0 && view === null && (
            <div
              className={clsx(
                "flex flex-row justify-center items-center",
                "w-full h-auto",
                "text-white text-[3rem]"
              )}
            >
              <button
                title={`Go to Page ${pageNum - 1}`}
                className={clsx(
                  "bx bx-chevron-left",
                  "arrows",
                  pageNum === 1 && "pointer-events-none text-slate-500"
                )}
                onClick={() => setPageNum(pageNum - 1)}
              ></button>
              {pageNum}
              <button
                title={`Go to Page ${pageNum + 1}`}
                className={clsx(
                  "bx bx-chevron-right",
                  "arrows",
                  pageNum === pageValues.length - 1 &&
                    "pointer-events-none text-slate-500"
                )}
                onClick={() => setPageNum(pageNum + 1)}
              ></button>
            </div>
          )}
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
    </div>
  );
}
