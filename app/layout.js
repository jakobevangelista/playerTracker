import "./globals.css";
import PocketBaseWrapper from "./PocketBaseWrapper";
import ChakraUiWrapper from "./ChakraUiWrapper";

export const metadata = {
  title: "Player Tracker",
  description: "Tracks players",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraUiWrapper>
          <PocketBaseWrapper>{children}</PocketBaseWrapper>
        </ChakraUiWrapper>
      </body>
    </html>
  );
}
