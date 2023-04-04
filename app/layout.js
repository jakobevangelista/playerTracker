import "./globals.css";
import PocketBaseWrapper from "./PocketBaseWrapper";

export const metadata = {
  title: "Player Tracker",
  description: "Tracks players",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PocketBaseWrapper>{children}</PocketBaseWrapper>
      </body>
    </html>
  );
}
