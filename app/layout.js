import "./globals.css";
import PocketBaseWrapper from "./PocketBaseWrapper";
import ChakraUiWrapper from "./ChakraUiWrapper";
import { PocketProvider } from "./PocketBaseWrapper";

export const metadata = {
  title: "Player Tracker",
  description: "Tracks players",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PocketProvider>
          <ChakraUiWrapper>{children}</ChakraUiWrapper>
        </PocketProvider>
      </body>
    </html>
  );
}
