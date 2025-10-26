import clsx from "clsx";
import { useEffect, useState } from "react";
import notFound from "@/bg/404.jpg";
import View from "./view/page";
import FireParticles from "../component/particles";
import bgHome from "@/bg/home.jpg";
export default function Favorite({
  userId,
  username,
  onGenre,
}: {
  userId: number;
  username: string;
  onGenre: (type: string, genreId: number) => void;
}) {
  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const [viewResult, setViewResult] = useState<number | null>(null);
  const [view, setView] = useState<number | null>(null);
  const [viewContents, setViewCOntents] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  const pageValues = [-1, 49, 99, 149, 199, 249, 299, 349, 399, 449, 499];
  const [pageNum, setPageNum] = useState(1);
  const handleResetView = () => {
    setView(null);
    setRefresh(!refresh);
  };
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

  const handleGenre = (type: string, genreId: number) => {
    onGenre(type, genreId);
  };

  const allVideos = savedMovies;
  const allMovies = savedMovies.filter((s: any) => s.type === "movie");
  const allTvs = savedMovies.filter((s: any) => s.type === "tv");
  const allAction = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 28 || g.id === 10759)
  );
  const allAdventure = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 12 || g.id === 10759)
  );
  const allAnimation = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 16)
  );
  const allComedy = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 35)
  );
  const allCrime = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 80)
  );
  const allDocumentary = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 99)
  );
  const allDrama = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 18)
  );
  const allFamily = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 10751)
  );
  const allFantasy = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 14 || g.id === 10765)
  );
  const allHistory = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 36)
  );
  const allHorror = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 27)
  );
  const allKids = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 10762)
  );
  const allMusic = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 10402)
  );
  const allMystery = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 9648)
  );
  const allNews = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 10763)
  );
  const allPolitics = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 10768)
  );
  const allReality = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 10764)
  );
  const allRomance = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 10749)
  );
  const allSciFi = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 878 || g.id === 10765)
  );
  const allSoap = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 10766)
  );
  const allTalk = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 10767)
  );
  const allTvMovie = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 10770)
  );
  const allThriller = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 53)
  );
  const allWar = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 10752 || g.id === 10768)
  );
  const allWestern = savedMovies.filter((s: any) =>
    s.genreIds.some((g: any) => g.id === 37)
  );

  const allSaved = [
    allVideos,
    allMovies,
    allTvs,
    allAction,
    allAdventure,
    allAnimation,
    allComedy,
    allCrime,
    allDocumentary,
    allDrama,
    allFamily,
    allFantasy,
    allHistory,
    allHorror,
    allKids,
    allMusic,
    allMystery,
    allNews,
    allPolitics,
    allReality,
    allRomance,
    allSciFi,
    allSoap,
    allTalk,
    allTvMovie,
    allThriller,
    allWar,
    allWestern,
  ];
  const [typeNum, setTypeNum] = useState(0);
  const resultPage = document.getElementById("results");
  return (
    <div
      className={clsx(
        "flex flex-col justify-center items-center",
        "w-full h-auto min-h-screen",
        "bg-black/50"
      )}
    >
      <div
        className={clsx(
          "flex flex-col justify-start items-center",
          "w-full h-auto min-h-screen",
          "bg-center bg-cover bg-no-repeat"
        )}
        style={{ backgroundImage: `url(${bgHome.src})` }}
      >
        <div
          className={clsx(
            "flex flex-col justify-center items-center",
            "w-full h-auto min-h-screen",
            "px-[8.5%] pt-[10rem]",
            "gap-10",
            "bg-black/70"
          )}
        >
          <div className="absolute inset-0">
            <FireParticles />
          </div>
          {view === null && (
            <div
              className={clsx(
                "flex flex-col justify-start items-center",
                "w-full h-auto min-h-[50rem] p-10",
                "border-red-500 border-[.2rem] border-solid",
                "bg-black/50",
                "z-1",
                "gap-20"
              )}
            >
              <div
                className={clsx(
                  "flex flex-row flex-wrap justify-center items-center",
                  "w-full h-auto",
                  "text-white text-[1.5rem]",
                  "uppercase",
                  "gap-10"
                )}
              >
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(0);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-list-ul", "text-[2rem]")}></i>
                    <p>All</p>
                  </span>
                  <p>{savedMovies.length}</p>
                </div>
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(1);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bxs-movie", "text-[2rem]")}></i>
                    <p>Movie</p>
                  </span>
                  <p>
                    {savedMovies.filter((s: any) => s.type === "movie").length}
                  </p>
                </div>
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(2);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bxs-tv", "text-[2rem]")}></i>
                    <p>Tv</p>
                  </span>
                  <p>
                    {savedMovies.filter((s: any) => s.type === "tv").length}
                  </p>
                </div>
              </div>
              <div
                className={clsx(
                  "flex flex-row flex-wrap justify-center items-center",
                  "w-full h-auto",
                  "text-white text-[1.2rem]",
                  "uppercase",
                  "gap-10"
                )}
              >
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(3);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-bomb", "text-[2rem]")}></i>
                    <p>Action</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some(
                          (g: any) => g.id === 28 || g.id === 10759
                        )
                      ).length
                    }
                  </p>
                </div>
                {/* Action */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(4);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-compass", "text-[2rem]")}></i>
                    <p>Adventure</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some(
                          (g: any) => g.id === 12 || g.id === 10759
                        )
                      ).length
                    }
                  </p>
                </div>
                {/* Adventure */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(5);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-movie-play", "text-[2rem]")}></i>
                    <p>Animation</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 16)
                      ).length
                    }
                  </p>
                </div>
                {/* Animation */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(6);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-laugh", "text-[2rem]")}></i>
                    <p>Comedy</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 35)
                      ).length
                    }
                  </p>
                </div>
                {/* Comedy */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(7);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-mask", "text-[2rem]")}></i>
                    <p>Crime</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 80)
                      ).length
                    }
                  </p>
                </div>
                {/* Crime */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(8);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i
                      className={clsx("bx bx-camera-movie", "text-[2rem]")}
                    ></i>
                    <p>Documentary</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 99)
                      ).length
                    }
                  </p>
                </div>
                {/* Documentary */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(9);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-sad", "text-[2rem]")}></i>
                    <p>Drama</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 18)
                      ).length
                    }
                  </p>
                </div>
                {/* Drama */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(10);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bxs-group", "text-[2rem]")}></i>
                    <p>Family</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 10751)
                      ).length
                    }
                  </p>
                </div>
                {/* Family */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(11);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bxs-magic-wand", "text-[2rem]")}></i>
                    <p>Fantasy</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some(
                          (g: any) => g.id === 14 || g.id === 10765
                        )
                      ).length
                    }
                  </p>
                </div>
                {/* Fantasy */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(12);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-book-alt", "text-[2rem]")}></i>
                    <p>History</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 36)
                      ).length
                    }
                  </p>
                </div>
                {/* History */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(13);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-ghost", "text-[2rem]")}></i>
                    <p>Horror</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 27)
                      ).length
                    }
                  </p>
                </div>
                {/* Horror */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(14);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-child", "text-[2rem]")}></i>
                    <p>Kids</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 10762)
                      ).length
                    }
                  </p>
                </div>
                {/* Kids */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(15);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-music", "text-[2rem]")}></i>
                    <p>Music</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 10402)
                      ).length
                    }
                  </p>
                </div>
                {/* Music */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(16);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-search-alt", "text-[2rem]")}></i>
                    <p>Mystery</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 9648)
                      ).length
                    }
                  </p>
                </div>
                {/* Mystery */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(17);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bxs-news", "text-[2rem]")}></i>
                    <p>News</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 10763)
                      ).length
                    }
                  </p>
                </div>
                {/* News */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(18);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-flag", "text-[2rem]")}></i>
                    <p>Politics</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 10768)
                      ).length
                    }
                  </p>
                </div>
                {/* Politics*/}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(19);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-user-voice", "text-[2rem]")}></i>
                    <p>Reality</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 10764)
                      ).length
                    }
                  </p>
                </div>
                {/* Reality */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(20);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-heart", "text-[2rem]")}></i>
                    <p>Romance</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 10749)
                      ).length
                    }
                  </p>
                </div>
                {/* Romance */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(21);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-planet", "text-[2rem]")}></i>
                    <p>Sci-Fi</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some(
                          (g: any) => g.id === 878 || g.id === 10765
                        )
                      ).length
                    }
                  </p>
                </div>
                {/* Science Fiction */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(22);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bxs-face-mask", "text-[2rem]")}></i>
                    <p>Soap</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 10766)
                      ).length
                    }
                  </p>
                </div>
                {/* Soap */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(23);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bxs-chat", "text-[2rem]")}></i>
                    <p>Talk</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 10767)
                      ).length
                    }
                  </p>
                </div>
                {/* Talk */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(24);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-tv", "text-[2rem]")}></i>
                    <p>Tv Movie</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 10770)
                      ).length
                    }
                  </p>
                </div>
                {/* Tv Movie */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(25);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-run", "text-[2rem]")}></i>
                    <p>Thriller</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 53)
                      ).length
                    }
                  </p>
                </div>
                {/* Thriller */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(26);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i
                      className={clsx("bx bx-shield-alt-2", "text-[2rem]")}
                    ></i>
                    <p>War</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some(
                          (g: any) => g.id === 10752 || g.id === 10768
                        )
                      ).length
                    }
                  </p>
                </div>
                {/* War */}
                <div
                  className={clsx("favorite")}
                  onClick={() => {
                    setTypeNum(27);
                    resultPage && resultPage.scrollIntoView();
                  }}
                >
                  <span
                    className={clsx(
                      "flex flex-row justify-start items-center",
                      "w-full",
                      "gap-3"
                    )}
                  >
                    <i className={clsx("bx bx-landscape", "text-[2rem]")}></i>
                    <p>Western</p>
                  </span>
                  <p>
                    {
                      savedMovies.filter((s: any) =>
                        s.genreIds.some((g: any) => g.id === 37)
                      ).length
                    }
                  </p>
                </div>
                {/* Western */}
              </div>
            </div>
          )}
        </div>
      </div>
      {view === null && (
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
              "flex flex-col justify-center items-center",
              "w-full h-auto min-h-screen",
              "p-50",
              "gap-[10rem]"
            )}
          >
            <ul
              className={clsx(
                "flex flex-row flex-wrap justify-center items-center",
                "w-full",
                "gap-10"
              )}
            >
              {allSaved[typeNum]
                .slice()
                .reverse()
                .map(
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
                            m.name,
                            m.ratings,
                            m.backdrop,
                            m.type,
                            m.overview,
                            m.poster,
                            m.date,
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
                            m.poster
                              ? `https://image.tmdb.org/t/p/original${m.poster}`
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
                              {m.name}
                            </p>
                            <div
                              className={clsx(
                                "flex flex-row justify-between items-center",
                                "w-full",
                                "text-[1.5rem]",
                                "uppercase"
                              )}
                            >
                              <p>{m.type}</p>
                              <div
                                className={clsx(
                                  "flex flex-row justify-center items-center",
                                  "gap-1"
                                )}
                                title={`${(m.ratings || 0).toFixed(1)} / 10`}
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
                                  {m.ratings > 10
                                    ? 10
                                    : (m.ratings || 0).toFixed(1)}
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
                    (pageNum > allSaved[typeNum].length / 50 ||
                      pageNum === pageValues.length - 1) &&
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
