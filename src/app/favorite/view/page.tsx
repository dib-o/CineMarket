"use client";

import clsx from "clsx";
import bgDrop from "@/bg/404L.jpg";
import { useEffect, useState } from "react";
export default function View({
  userId,
  username,
  id,
  name,
  ratings,
  backdrop,
  type,
  overview,
  poster,
  date,
  onBack,
  onGenre
}: {
  userId: number;
  username: string;
  id: number;
  name: string;
  ratings: number;
  backdrop: string;
  type: string;
  overview: string;
  poster: string;
  date: string;
  onBack: (resetView: number) => void;
  onGenre: (type: string, genreId: number) => void;
}) {
  const [play, setPlay] = useState(false);
  const [genres, setGenres] = useState<any[]>([]);
  const [playHovered, setPlayHovered] = useState(false);
  const [addHovered, setAddHovered] = useState(false);
  const [backHovered, setBackHovered] = useState(false);
  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(true);

  const getsavedMovies = async () => {
    setLoading(true);
    const result = savedMovies.find((m: any) => m.id === id);
    if (result) {
      try {
        const res = await fetch("/api/user-data", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            username: username,
            movieId: id,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setSuccess(true);
          setMessage("Movie has been deleted from the folder");
          setSavedMovies(savedMovies.filter((m: any) => m.id !== id));
          setRefresh(!refresh);
        } else {
          setSuccess(false);
          setMessage(`Delete failed: ${data.message}`);
        }
      } catch (err: any) {
        setSuccess(false);
        setMessage(`Error deleting movie: ${err.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const res = await fetch("api/user-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            username: username,
            id: id,
            name: name,
            type: type,
            ratings: ratings,
            overview: overview,
            poster: poster,
            backdrop: backdrop,
            date: date,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setSuccess(true);
          setMessage(`${name} added succesfully!`);
          setRefresh(!refresh);
        } else {
          setSuccess(false);
          setMessage(`${data.message}`);
        }
      } catch (err) {
        setSuccess(false);
        setMessage("Failed to add. Check your connection.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const BASE_URL = "https://api.themoviedb.org/3";

      try {
        const res = await fetch(
          `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
        console.log(data);
        setGenres(data.genres);
        console.log(data.genres);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    fetch(`/api/user-data?userId=${userId}&username=${username}`)
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setSavedMovies(data.Movies || []);
      })
      .catch((err) => console.error("Fetch error:", err.message));
  }, [refresh]);

  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);

  return (
    <div
      className={clsx(
        "absolute",
        "inset-0",
        "flex flex-col justify-start items-center",
        "w-full h-auto min-h-[screen]",
        "bg-gradient-to-l from-black to-red-500",
        "z-2",
        "text-white"
      )}
    >
      <div
        className={clsx(
          "absolute",
          "w-full h-screen",
          "overflow-hidden",
          "bg-center bg-cover bg-no-repeat",
          "opacity-80"
        )}
        style={{
          backgroundImage: `url(${
            backdrop
              ? `https://image.tmdb.org/t/p/original${backdrop}`
              : bgDrop.src
          })`,
        }}
      >
        {/* <img
          className={clsx("w-full h-full", "object-center", "opacity-70")}
          src={
            backdrop
              ? `https://image.tmdb.org/t/p/original/${backdrop}`
              : bgDrop.src
          }
          alt="backdrop img"
        /> */}
      </div>
      <div
        className={clsx(
          "relative",
          "flex flex-col justify-center items-center",
          "w-full h-auto min-h-screen",
          "z-3"
        )}
      >
        <div
          className={clsx(
            "absolute",
            "bottom-0 left-[-1rem]",
            "flex flex-col justify-center items-start",
            "w-[70rem] h-auto pl-[8%] pr-[3rem] pt-[1rem] pb-[2rem] mb-[5rem]",
            "rounded-br-[2rem] rounded-tr-[2rem]",
            "text-[3rem]",
            "bg-black/70",
            "shadow-[inset_0_0_5px_red]",
            "max-[750px]:w-[80%]"
          )}
        >
          <div
            className={clsx(
              "flex flex-col justify-center items-start",
              "w-full h-auto",
              "gap-3"
            )}
          >
            <h1
              className={clsx(
                "text-[3rem] text-shadow-[2px_2px_5px_rgba(0,0,0.2)]"
              )}
            >
              {name}
            </h1>
            <div
              className={clsx(
                "flex flex-row flex-wrap justify-start items-center",
                "w-full h-auto",
                "text-[1.3rem]",
                "gap-5"
              )}
            >
              {genres.map((g: any, index) => (
                <div
                  key={index}
                  className={clsx("genres")}
                  onClick={() => onGenre(type, g.id)}
                >
                  {g.name}
                </div>
              ))}
            </div>
            <div
              className={clsx(
                "flex flex-row flex-wrap justify-start items-center",
                "w-full h-auto",
                "text-[1.3rem]",
                "gap-5"
              )}
            >
              <div
                className={clsx(
                  "flex flex-row justify-center items-center",
                  "w-auto h-auto",
                  "text-[1.5rem]",
                  "gap-3"
                )}
                title={`${ratings > 10 ? 10 : (ratings || 0).toFixed(1)} / 10`}
              >
                <i className={clsx("bx bxs-star", "text-red-500")}></i>
                <p>{ratings > 10 ? 10 : (ratings || 0).toFixed(1)}</p>
              </div>
              <div
                className={clsx(
                  "flex flex-row justify-center items-center",
                  "w-auto h-auto",
                  "text-[1.5rem]",
                  "gap-3"
                )}
              >
                <i className={clsx("bx bxs-calendar", "text-red-500")}></i>
                <p>{date}</p>
              </div>
            </div>
            <p
              className={clsx(
                "w-full",
                "my-[.5rem]",
                "text-[1rem] text-justify"
              )}
            >
              {overview}
            </p>
            <div
              className={clsx(
                "flex flex-row justify-start items-center",
                "w-full h-auto",
                "gap-5"
              )}
            >
              <button
                className={clsx(
                  "view",
                  playHovered && "shadow-[0_0_5px_red] text-red-500"
                )}
                onMouseEnter={() => setPlayHovered(true)}
                onMouseLeave={() => setPlayHovered(false)}
                onClick={() => setPlay(true)}
              >
                <i
                  className={clsx(
                    "bx bx-play",
                    "transition-all duration-300 ease-in-out"
                  )}
                ></i>
                <p>Play</p>
              </button>
              <button
                className={clsx(
                  "view",
                  addHovered && "shadow-[0_0_5px_red] text-red-500",
                  loading && "pointer-events-none"
                )}
                onMouseEnter={() => setAddHovered(true)}
                onMouseLeave={() => setAddHovered(false)}
                onClick={() => getsavedMovies()}
                disabled={loading}
              >
                <i
                  className={clsx(
                    "bx bxs-folder-minus",
                    "transition-all duration-300 ease-in-out"
                  )}
                ></i>
                <p>
                  {savedMovies.find((m: any) => m.id === id) ? "Drop" : "Add"}
                </p>
              </button>
              <button
                className={clsx(
                  "view",
                  backHovered && "shadow-[0_0_5px_red] text-red-500"
                )}
                onMouseEnter={() => setBackHovered(true)}
                onMouseLeave={() => setBackHovered(false)}
                onClick={() => onBack(1)}
              >
                <i
                  className={clsx(
                    "bx bx-list-ul",
                    "transition-all duration-300 ease-in-out"
                  )}
                ></i>
                <p>List</p>
              </button>
            </div>
            <p
              className={clsx(
                "mt-[1rem]",
                "text-[1.5rem] text-center",
                "w-full",
                "text-shadow-[0_0_5px_rgba(0,0,0.5)]",
                success ? "text-green-300" : "text-red-300"
              )}
            >
              {message}
            </p>
          </div>
        </div>
      </div>
      {play && (
        <div
          className={clsx(
            "absolute",
            "inset-0",
            "pt-[8.5rem]",
            "w-full h-screen",
            "bg-gradient-to-r from-red-500 to-black",
            "z-10"
          )}
        >
          <div
            className={clsx(
              "bx bx-arrow-back",
              "absolute",
              "top-0",
              "mt-[8.5rem]",
              "w-auto h-auto p-10",
              "text-white text-[3rem]",
              "cursor-pointer"
            )}
            onClick={() => setPlay(false)}
          ></div>
          <iframe
            className={clsx("w-full h-full")}
            src={
              type === "movie"
                ? `https://www.vidking.net/embed/${type}/${id}`
                : `https://www.vidking.net/embed/${type}/${id}/1/1?autoPlay=true&nextEpisode=true&episodeSelector=true`
            }
            allowFullScreen
          ></iframe>
          {/* <div className={clsx("text-white")}>
            {type}/{id}/{type}
          </div> */}
        </div>
      )}
    </div>
  );
}
