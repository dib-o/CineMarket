"use client";

import clsx from "clsx";
import { useState } from "react";
import "boxicons/css/boxicons.min.css";
import bgHome from "@/bg/home.jpg";
import notFound from "@/bg/404.jpg";
import View from "./view/page";
import FireParticles from "../component/particles";
export default function Search({
  userId,
  username,
  onGenre,
}: {
  userId: number;
  username: string;
  onGenre: (type: string, genreId: number) => void;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("All");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewResult, setViewResult] = useState<number | null>(null);
  const [view, setView] = useState<number | null>(null);
  const [viewContents, setViewCOntents] = useState<any[]>([]);
  const pageValues = [-1, 49, 99, 149, 199, 249, 299, 349, 399, 449, 499];
  const [pageNum, setPageNum] = useState(1);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setPageNum(1);
    if (!title || !type) return;
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const BASE_URL = "https://api.themoviedb.org/3";

    let endpoint = `${BASE_URL}/search/multi`;
    if (type === "Movies") endpoint = `${BASE_URL}/search/movie`;
    if (type === "TV Series" || type === "Anime")
      endpoint = `${BASE_URL}/search/tv`;

    try {
      setLoading(true);

      const promises = Array.from({ length: 25 }, (_, i) =>
        fetch(
          type === "Anime"
            ? `${endpoint}?api_key=${API_KEY}&query=${encodeURIComponent(
                title
              )}&with_origin_country=JP&page=${i + 1}`
            : `${endpoint}?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
                title
              )}&include_adult=true&page=${i + 1}`
        ).then((res) => res.json())
      );

      const results = await Promise.all(promises);
      const combined = results.flatMap((r) => r.results ?? []);
      setResults(combined);
      console.log(combined);
      setTimeout(() => {
        const res = document.getElementById("results");
        res?.scrollIntoView();
      }, 500);
    } catch (err) {
      console.error("Error fetching from TMDB:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetView = (resetView: number) => {
    setView(null);
    setTimeout(() => {
      const res = document.getElementById("results");
      res?.scrollIntoView();
    }, 500);
  };

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
          "w-full h-auto min-h-screen",
          "bg-center bg-cover bg-no-repeat"
        )}
        style={{ backgroundImage: `url(${bgHome.src})` }}
      >
        <div
          className={clsx(
            "flex flex-col justify-center items-center",
            "w-full h-auto min-h-screen",
            "gap-10",
            "bg-black/70"
          )}
        >
          <div className="absolute inset-0">
            <FireParticles />
          </div>
          <div
            className={clsx(
              "flex flex-col justify-center items-center",
              "w-full h-auto",
              "gap-10",
              "z-1"
            )}
          >
            <div
              className={clsx(
                "flex flex-col justify-center items-center",
                "w-full h-auto"
              )}
            >
              <h1
                className={clsx(
                  "text-red-500 text-[5rem] text-shadow-[2px_2px_5px_rgba(0,0,0.2)]"
                )}
                style={{ WebkitTextStroke: "1px white" }}
              >
                Step Into a World of Stories
              </h1>
              <p
                className={clsx(
                  "text-white text-[1.7rem] text-shadow-[2px_2px_5px_rgba(0,0,0.2)]"
                )}
              >
                Search and stream thousands of movies, TV shows, and anime
                adventures.
              </p>
            </div>
            <div
              className={clsx(
                "flex justify-center items-center",
                "w-full h-auto"
              )}
            >
              <form
                className={clsx(
                  "flex flex-row justify-center items-center",
                  "w-[61rem] h-auto p-5",
                  "text-black font-semibold",
                  "gap-5",
                  "bg-red-500",
                  "rounded-[1rem]",
                  "shadow-[0_0_5px_rgba(0,0,0.2)]"
                )}
                onSubmit={(e) => handleSearch(e)}
              >
                {/* <select
                  className={clsx(
                    "text-[1.5rem] text-center appearance-none",
                    "w-[20%] h-auto p-5",
                    "rounded-[1rem]",
                    "cursor-pointer",
                    "shadow-[inset_0_0_5px_rgba(0,0,0.2)]",
                    "bg-white"
                  )}
                  name="type"
                  title="Show Result"
                  value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  required
                >
                  <option className={clsx("bg-white")} value="1">
                    Show: 20
                  </option>
                  <option className={clsx("bg-white")} value="2">
                    Show: 40
                  </option>
                  <option className={clsx("bg-white")} value="3">
                    Show: 60
                  </option>
                  <option className={clsx("bg-white")} value="4">
                    Show: 80
                  </option>
                  <option className={clsx("bg-white")} value="5">
                    Show: 100
                  </option>
                </select> */}
                <select
                  className={clsx(
                    "text-[1.5rem] text-center appearance-none",
                    "w-[30%] h-auto p-5",
                    "rounded-[1rem]",
                    "cursor-pointer",
                    "shadow-[inset_0_0_5px_rgba(0,0,0.2)]",
                    "bg-white",
                    "uppercase"
                  )}
                  name="type"
                  title="Search Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option className={clsx("bg-red-500")} value="">
                    Select Type
                  </option>
                  <option className={clsx("bg-white")} value="All">
                    All
                  </option>
                  <option className={clsx("bg-white")} value="Movies">
                    Movies
                  </option>
                  <option className={clsx("bg-white")} value="TV Series">
                    TV Series
                  </option>
                  <option className={clsx("bg-white")} value="Anime">
                    Anime
                  </option>
                </select>
                <div
                  className={clsx(
                    "flex flex-row justify-center items-center",
                    "w-[70%] h-auto p-5",
                    "rounded-[1rem]",
                    "shadow-[inset_0_0_5px_rgba(0,0,0.2)]",
                    "gap-5",
                    "bg-white"
                  )}
                >
                  <button
                    className={clsx(
                      "bx bxs-search-alt-2",
                      "w-[10%] h-auto",
                      "text-[2rem]",
                      "cursor-pointer",
                      "transition-all duration-300 ease-in-out",
                      "hover:text-red-500"
                    )}
                    type="submit"
                  ></button>
                  <input
                    className={clsx("text-[1.5rem]", "w-[90%] h-auto")}
                    type="text"
                    value={title}
                    title={`Search by ${type}`}
                    autoComplete="off"
                    placeholder="Type here to search"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {results.length !== 0 && view === null && (
        <div
          id="results"
          className={clsx(
            "flex flex-col justify-center items-center",
            "w-full h-auto min-h-screen",
            "bg-gradient-to-b from-black to-red-950"
          )}
        >
          <div
            className={clsx(
              "flex flex-col justify-start items-center",
              "w-full h-auto min-h-screen",
              "p-50",
              "gap-[10rem]"
            )}
          >
            <h1 className={clsx("homeTitle", "text-[5rem]")}>Results</h1>
            <ul
              className={clsx(
                "flex flex-row flex-wrap justify-center items-center",
                "w-full h-auto",
                "gap-10"
              )}
            >
              {results.map(
                (r: any, index) =>
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
                            <p>{r.media_type ? r.media_type : "tv"}</p>
                            <div
                              className={clsx(
                                "flex flex-row justify-center items-center",
                                "gap-1"
                              )}
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
                                /10
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
                    (pageNum > results.length / 50 || pageNum === pageValues.length-1) &&
                      "pointer-events-none text-slate-500"
                  )}
                  onClick={() => setPageNum(pageNum + 1)}
                ></button>
              </div>
            </ul>
          </div>
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
  );
}
