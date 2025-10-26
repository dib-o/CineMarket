"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

export default function ChangeInfo({
  infoType,
  emailValue,
  passwordValue,
  userId,
  onInfoChange,
  onExit,
}: {
  infoType: string;
  emailValue: string;
  passwordValue: string;
  userId: number;
  onInfoChange: (newEmail: string, newPassword: string) => void;
  onExit: (exitDestination: string) => void;
}) {
  const [currentUserId, setCurrentUserId] = useState(0);
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focus, setFocus] = useState("");

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPassword !== passwordValue) {
      setSuccess(false);
      if (infoType === "email") {
        setMessage("Password incorrect!");
      } else {
        setMessage("Old password incorrect!");
      }
    } else {
      setLoading(true);
      try {
        const res = await fetch("/api/users", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: currentUserId,
            newEmail: newEmail === "" ? emailValue : newEmail,
            newPassword: newPassword === "" ? passwordValue : newPassword,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setSuccess(true);
          if (infoType === "email") {
            setMessage("Email has been updated");
          } else {
            setMessage("Password has been updated");
          }
          onInfoChange(
            newEmail === "" ? emailValue : newEmail,
            newPassword === "" ? passwordValue : newPassword
          );
        } else {
          setSuccess(false);
          if (infoType === "email") {
            setMessage(`Updating email failed!\n${data.message}`);
          } else {
            setMessage(`Updating password failed!\n${data.message}`);
          }
        }
      } catch (err: any) {
        setSuccess(false);
        if (infoType === "email") {
          setMessage(`Error updating email: ${err.message}`);
        } else {
          setMessage(`Error updating password: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
    clearInputs();
  };
  const clearInputs = () => {
    setCurrentPassword("");
    setNewEmail("");
    setNewPassword("");
  };
  useEffect(() => {
    setCurrentUserId(userId);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [message]);

  return (
    <div
      className={clsx(
        "fixed",
        "inset-0",
        "flex justify-center items-center",
        "w-full h-screen",
        "backdrop-blur-sm",
        "z-5"
      )}
    >
      <div
        className={clsx(
          "flex flex-col justify-start items-center",
          "w-[40rem] h-auto p-5",
          "text-white",
          "bg-black/50",
          "rounded-[2rem]",
          "shadow-[inset_0_0_5px_white]"
        )}
      >
        {infoType === "email" && (
          <>
            <p
              className={clsx(
                "w-auto h-auto p-5",
                "text-[1.8rem]",
                "uppercase",
                "rounded-[.5rem]",
                "border-b-red-500 border-solid border-b-[.4rem]"
              )}
            >
              Update Email
            </p>
            <form
              className={clsx(
                "flex flex-col justify-center items-centerF",
                "w-full h-auto p-[3.5rem]",
                "text-center",
                "gap-10"
              )}
              onSubmit={(e) => handleUpdateEmail(e)}
            >
              <div
                className={clsx(
                  "flex flex-row justify-center items-center",
                  "w-full h-auto",
                  "rounded-[1rem]",
                  "bg-black",
                  focus === "currentPassword"
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
                  value={currentPassword}
                  placeholder="Password"
                  autoComplete="off"
                  onFocus={() => setFocus("currentPassword")}
                  onBlur={() => setFocus("")}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div
                className={clsx(
                  "flex flex-row justify-center items-center",
                  "w-full h-auto",
                  "rounded-[1rem]",
                  "bg-black",
                  focus === "newEmail"
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
                  value={newEmail}
                  placeholder="New Email"
                  autoComplete="off"
                  onFocus={() => setFocus("newEmail")}
                  onBlur={() => setFocus("")}
                  onChange={(e) => setNewEmail(e.target.value)}
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
                  Update
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
          </>
        )}
        {infoType === "password" && (
          <>
            <p
              className={clsx(
                "w-auto h-auto p-5",
                "text-[1.8rem]",
                "uppercase",
                "rounded-[.5rem]",
                "border-b-red-500 border-solid border-b-[.4rem]"
              )}
            >
              Update Password
            </p>
            <form
              className={clsx(
                "flex flex-col justify-center items-centerF",
                "w-full h-auto p-[3.5rem]",
                "text-center",
                "gap-10"
              )}
              onSubmit={(e) => handleUpdateEmail(e)}
            >
              <div
                className={clsx(
                  "flex flex-row justify-center items-center",
                  "w-full h-auto",
                  "rounded-[1rem]",
                  "bg-black",
                  focus === "currentPassword"
                    ? "shadow-[inset_0_0_5px_#fb2c36]"
                    : "shadow-[inset_0_0_5px_white]"
                )}
              >
                <i
                  className={clsx(
                    "bx bx-lock-alt",
                    "text-[1.5rem]",
                    "w-[5rem] h-auto p-5"
                  )}
                ></i>
                <input
                  className={clsx("text-[1.5rem]", "w-full h-auto py-5 pr-5")}
                  type="password"
                  value={currentPassword}
                  placeholder="Old Password"
                  autoComplete="off"
                  onFocus={() => setFocus("currentPassword")}
                  onBlur={() => setFocus("")}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div
                className={clsx(
                  "flex flex-row justify-center items-center",
                  "w-full h-auto",
                  "rounded-[1rem]",
                  "bg-black",
                  focus === "newPassword"
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
                  value={newPassword}
                  placeholder="New Password"
                  autoComplete="off"
                  onFocus={() => setFocus("newPassword")}
                  onBlur={() => setFocus("")}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  Update
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
          </>
        )}
      </div>
    </div>
  );
}
