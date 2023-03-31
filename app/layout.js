import "./globals.css";

export const metadata = {
  title: "Player Tracker",
  description: "Tracks players",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
