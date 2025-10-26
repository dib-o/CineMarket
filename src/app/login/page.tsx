"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Login({
  onExit,
  onLogin,
}: {
  onExit: (exitNow: string) => void;
  onLogin: (
    userId: number,
    username: string,
    email: string,
    password: string,
    date: string
  ) => void;
}) {
  const [forgotPass, setForgotPass] = useState(false);
  const [signState, setSignState] = useState("SignIn");
  const [focus, setFocus] = useState("");
  const [userId, setUserId] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    setFocus("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const found = accounts.some(
      (a: any) => a.username === username && a.password === password
    );
    accounts.map((a: any) => {
      if (a.username === username && a.password === password) {
        onLogin(a.userId, a.username, a.email, a.password, a.date);
      }
    });
    if (!found) {
      setSuccess(false);
      setMessage("Incorrect username or password.");
    }
    clearInputs();
  };
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          username,
          email,
          password,
          date: new Date().toISOString().slice(0, 10),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setMessage("User Created Successfully!");
      } else {
        setMessage(`${data.message}`);
        setSuccess(false);
      }
    } catch (err) {
      setMessage("Failed to Create User. Check your Connection.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
    setUserId(userId + 1);
    clearInputs();
  };
  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const found = accounts.some(
      (a: any) => a.username === username && a.email === email
    );
    let foundUsername;
    let foundEmail;
    let foundPassword;
    accounts.map((a: any) => {
      if (a.username === username && a.email === email) {
        foundUsername = a.username;
        foundEmail = a.email;
        foundPassword = a.password;
      }
    });
    if (found) {
      try {
        // Send the email
        const res = await fetch("/api/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: foundEmail,
            subject: "Recover Password!",
            message: `Username: ${foundUsername}\nPassword: ${foundPassword}`,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setSuccess(true);
          setMessage("We have sent you an e-mail with the password.");
        } else {
          setSuccess(false);
          console.log(data.error);
          setMessage("Failed to send email!");
        }
      } catch (error) {
        setSuccess(false);
        console.log(error);
        setMessage("Something went wrong while sending the email.");
      }
    } else {
      setSuccess(false);
      setMessage("Username or email not found!");
    }
    clearInputs();
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [message]);

  useEffect(() => {
    fetch("/api/users")
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg);
        }
        return res.json();
      })
      .then((data) => {
        setAccounts(data);
      })
      .catch((err) => console.error("Fetch error:", err.message));
  }, [userId]);

  useEffect(() => {
    if (accounts.length !== 0) {
      setUserId(accounts.length + 1);
    }
  }, [accounts]);
  return (
    <div
      className={clsx(
        "fixed",
        "inset-0",
        "flex justify-center items-center",
        "w-full h-screen",
        "backdrop-blur-[.5rem]"
      )}
    >
      <div
        className={clsx(
          "flex flex-col justify-start items-center",
          "w-[40rem] h-auto",
          "text-white",
          "bg-black/50",
          "rounded-[2rem]",
          "shadow-[inset_0_0_5px_white]"
        )}
      >
        {!forgotPass ? (
          <>
            <div
              className={clsx(
                "flex flex-row justify-center items-center",
                "w-full h-auto p-5",
                "gap-10",
                "text-[1.8rem]",
                "uppercase"
              )}
            >
              <a
                className={clsx(
                  "w-auto h-auto p-5",
                  "rounded-[.5rem]",
                  "cursor-pointer",
                  "border-solid border-b-[.4rem] border-transparent",
                  signState === "SignIn" && "border-b-red-500 "
                )}
                onClick={() => {
                  setSignState("SignIn");
                  clearInputs();
                }}
              >
                Sign In
              </a>
              <a
                className={clsx(
                  "w-auto h-auto p-5",
                  "rounded-[.5rem]",
                  "cursor-pointer",
                  "border-solid border-b-[.4rem] border-transparent",
                  signState === "SignUp" && "border-b-red-500 "
                )}
                onClick={() => {
                  setSignState("SignUp");
                  clearInputs();
                }}
              >
                Sign Up
              </a>
            </div>
            {signState === "SignIn" && (
              <form
                className={clsx(
                  "flex flex-col justify-center items-centerF",
                  "w-full h-auto p-[3.5rem]",
                  "text-center",
                  "gap-10"
                )}
                onSubmit={(e) => handleLogin(e)}
              >
                <div
                  className={clsx(
                    "flex flex-row justify-center items-center",
                    "w-full h-auto",
                    "rounded-[1rem]",
                    "bg-black",
                    focus === "username"
                      ? "shadow-[inset_0_0_5px_#fb2c36]"
                      : "shadow-[inset_0_0_5px_white]"
                  )}
                >
                  <i
                    className={clsx(
                      "bx bxs-user",
                      "text-[1.5rem]",
                      "w-[5rem] h-auto p-5"
                    )}
                  ></i>
                  <input
                    className={clsx("text-[1.5rem]", "w-full h-auto py-5 pr-5")}
                    type="text"
                    value={username}
                    placeholder="Username"
                    autoComplete="username"
                    onFocus={() => setFocus("username")}
                    onBlur={() => setFocus("")}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div
                  className={clsx(
                    "flex flex-row justify-center items-center",
                    "w-full h-auto",
                    "rounded-[1rem]",
                    "bg-black",
                    focus === "password"
                      ? "shadow-[inset_0_0_5px_#fb2c36]"
                      : "shadow-[inset_0_0_5px_white]"
                  )}
                >
                  <i
                    className={clsx(
                      "bx bxs-lock-alt",
                      "text-[1.5rem]",
                      "w-[5rem] h-auto p-5"
                    )}
                  ></i>
                  <input
                    className={clsx("text-[1.5rem]", "w-full h-auto py-5 pr-5")}
                    type="password"
                    value={password}
                    placeholder="Password"
                    autoComplete="new-password"
                    onFocus={() => setFocus("password")}
                    onBlur={() => setFocus("")}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <p
                  className={clsx(
                    "text-[1.5rem]",
                    "cursor-pointer",
                    "transition-all duration-300 ease-in-out",
                    "hover:text-red-500"
                  )}
                  onClick={() => setForgotPass(true)}
                >
                  Forgot Password?
                </p>
                <p
                  className={clsx(
                    "text-white text-[1.5rem]",
                    success
                      ? "text-shadow-[2px_2px_5px_green]"
                      : "text-shadow-[2px_2px_5px_red]"
                  )}
                >
                  {message}
                </p>
                <div
                  className={clsx(
                    "flex flex-row justify-center items-center",
                    "w-full h-auto",
                    "mt-[2.5rem]",
                    "gap-10"
                  )}
                >
                  <button
                    className={clsx(
                      "text-[1.5rem]",
                      "w-[50%] h-auto p-5",
                      "rounded-[1rem]",
                      "cursor-pointer",
                      "bg-red-500",
                      "hover:shadow-[inset_0_0_10px_rgba(0,0,0.8)]"
                    )}
                    type="submit"
                  >
                    Login
                  </button>
                  <button
                    className={clsx(
                      "text-[1.5rem]",
                      "w-[50%] h-auto p-5",
                      "rounded-[1rem]",
                      "cursor-pointer",
                      "bg-black",
                      "hover:shadow-[inset_0_0_5px_white]"
                    )}
                    onClick={() => onExit("Home")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            {signState === "SignUp" && (
              <form
                className={clsx(
                  "flex flex-col justify-center items-centerF",
                  "w-full h-auto p-[3.5rem]",
                  "text-center",
                  "gap-10"
                )}
                onSubmit={(e) => handleCreate(e)}
              >
                <div
                  className={clsx(
                    "flex flex-row justify-center items-center",
                    "w-full h-auto",
                    "rounded-[1rem]",
                    "bg-black",
                    focus === "username"
                      ? "shadow-[inset_0_0_5px_#fb2c36]"
                      : "shadow-[inset_0_0_5px_white]"
                  )}
                >
                  <i
                    className={clsx(
                      "bx bxs-user",
                      "text-[1.5rem]",
                      "w-[5rem] h-auto p-5"
                    )}
                  ></i>
                  <input
                    className={clsx("text-[1.5rem]", "w-full h-auto py-5 pr-5")}
                    type="text"
                    minLength={5}
                    value={username}
                    placeholder="Username"
                    autoComplete="off"
                    onFocus={() => setFocus("username")}
                    onBlur={() => setFocus("")}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div
                  className={clsx(
                    "flex flex-row justify-center items-center",
                    "w-full h-auto",
                    "rounded-[1rem]",
                    "bg-black",
                    focus === "email"
                      ? "shadow-[inset_0_0_5px_#fb2c36]"
                      : "shadow-[inset_0_0_5px_white]"
                  )}
                >
                  <i
                    className={clsx(
                      "bx bxs-envelope",
                      "text-[1.5rem]",
                      "w-[5rem] h-auto p-5"
                    )}
                  ></i>
                  <input
                    className={clsx("text-[1.5rem]", "w-full h-auto py-5 pr-5")}
                    type="email"
                    value={email}
                    placeholder="Email"
                    autoComplete="email"
                    onFocus={() => setFocus("email")}
                    onBlur={() => setFocus("")}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div
                  className={clsx(
                    "flex flex-row justify-center items-center",
                    "w-full h-auto",
                    "rounded-[1rem]",
                    "bg-black",
                    focus === "password"
                      ? "shadow-[inset_0_0_5px_#fb2c36]"
                      : "shadow-[inset_0_0_5px_white]"
                  )}
                >
                  <i
                    className={clsx(
                      "bx bxs-lock-alt",
                      "text-[1.5rem]",
                      "w-[5rem] h-auto p-5"
                    )}
                  ></i>
                  <input
                    className={clsx("text-[1.5rem]", "w-full h-auto py-5 pr-5")}
                    type="password"
                    minLength={5}
                    value={password}
                    placeholder="Password"
                    autoComplete="new-password"
                    onFocus={() => setFocus("password")}
                    onBlur={() => setFocus("")}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <p
                  className={clsx(
                    "text-white text-[1.5rem]",
                    success
                      ? "text-shadow-[2px_2px_5px_green]"
                      : "text-shadow-[2px_2px_5px_red]"
                  )}
                >
                  {message}
                </p>
                <div
                  className={clsx(
                    "flex flex-row justify-center items-center",
                    "w-full h-auto",
                    "gap-10"
                  )}
                >
                  <button
                    className={clsx(
                      "text-[1.5rem]",
                      "w-[50%] h-auto p-5",
                      "rounded-[1rem]",
                      "cursor-pointer",
                      "bg-red-500",
                      "hover:shadow-[inset_0_0_10px_rgba(0,0,0.8)]"
                    )}
                    type="submit"
                    disabled={loading}
                  >
                    Create
                  </button>
                  <button
                    className={clsx(
                      "text-[1.5rem]",
                      "w-[50%] h-auto p-5",
                      "rounded-[1rem]",
                      "cursor-pointer",
                      "bg-black",
                      "hover:shadow-[inset_0_0_5px_white]"
                    )}
                    onClick={() => onExit("Home")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          <div
            className={clsx(
              "flex flex-col justify-center items-center",
              "w-full h-auto"
            )}
          >
            <div
              className={clsx(
                "flex flex-row justify-center items-center",
                "w-full h-auto p-5",
                "gap-10",
                "text-[1.8rem]",
                "uppercase"
              )}
            >
              <p
                className={clsx(
                  "w-auto h-auto p-5",
                  "text-[1.8rem]",
                  "uppercase",
                  "rounded-[.5rem]",
                  "border-b-red-500 border-solid border-b-[.4rem]"
                )}
              >
                Recover Password
              </p>
            </div>
            <form
              className={clsx(
                "flex flex-col justify-center items-centerF",
                "w-full h-auto p-[3.5rem]",
                "text-center",
                "gap-10"
              )}
              onSubmit={(e) => handleRecover(e)}
            >
              <div
                className={clsx(
                  "flex flex-row justify-center items-center",
                  "w-full h-auto",
                  "rounded-[1rem]",
                  "bg-black",
                  focus === "username"
                    ? "shadow-[inset_0_0_5px_#fb2c36]"
                    : "shadow-[inset_0_0_5px_white]"
                )}
              >
                <i
                  className={clsx(
                    "bx bxs-user",
                    "text-[1.5rem]",
                    "w-[5rem] h-auto p-5"
                  )}
                ></i>
                <input
                  className={clsx("text-[1.5rem]", "w-full h-auto py-5 pr-5")}
                  type="text"
                  minLength={5}
                  value={username}
                  placeholder="Username"
                  autoComplete="off"
                  onFocus={() => setFocus("username")}
                  onBlur={() => setFocus("")}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div
                className={clsx(
                  "flex flex-row justify-center items-center",
                  "w-full h-auto",
                  "rounded-[1rem]",
                  "bg-black",
                  focus === "email"
                    ? "shadow-[inset_0_0_5px_#fb2c36]"
                    : "shadow-[inset_0_0_5px_white]"
                )}
              >
                <i
                  className={clsx(
                    "bx bxs-envelope",
                    "text-[1.5rem]",
                    "w-[5rem] h-auto p-5"
                  )}
                ></i>
                <input
                  className={clsx("text-[1.5rem]", "w-full h-auto py-5 pr-5")}
                  type="email"
                  value={email}
                  placeholder="Email"
                  autoComplete="email"
                  onFocus={() => setFocus("email")}
                  onBlur={() => setFocus("")}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <p
                className={clsx(
                  "text-white text-[1.5rem]",
                  success
                    ? "text-shadow-[2px_2px_5px_green]"
                    : "text-shadow-[2px_2px_5px_red]"
                )}
              >
                {message}
              </p>
              <div
                className={clsx(
                  "flex flex-row justify-center items-center",
                  "w-full h-auto",
                  "gap-10"
                )}
              >
                <button
                  className={clsx(
                    "text-[1.5rem]",
                    "w-[50%] h-auto p-5",
                    "rounded-[1rem]",
                    "cursor-pointer",
                    "bg-red-500",
                    "hover:shadow-[inset_0_0_10px_rgba(0,0,0.8)]"
                  )}
                  type="submit"
                >
                  Send
                </button>
                <button
                  className={clsx(
                    "text-[1.5rem]",
                    "w-[50%] h-auto p-5",
                    "rounded-[1rem]",
                    "cursor-pointer",
                    "bg-black",
                    "hover:shadow-[inset_0_0_5px_white]"
                  )}
                  onClick={() => {
                    setForgotPass(false);
                    clearInputs();
                  }}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
