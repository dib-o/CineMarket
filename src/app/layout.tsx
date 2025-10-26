import "./globals.css";
import clsx from "clsx";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "flex flex-col justify-center items-center",
          "w-full h-auto min-h-screen"
        )}
      >
        {children}
      </body>
    </html>
  );
}
