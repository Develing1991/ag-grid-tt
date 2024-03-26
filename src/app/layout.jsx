import { Inter } from "next/font/google";
import Link from "next/link";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <ul>
            <li>
              <Link href="001-quickstart-guide">001-quickstart-guide</Link>
            </li>
            <li style={{ listStyle: "none" }}>
              <ul>
                <li>
                  <Link href="001-quickstart-guide">
                    003-customizing-cells/simple-renderer
                  </Link>
                </li>
                <li>
                  <Link href="001-quickstart-guide">
                    003-customizing-cells/cellRenderer
                  </Link>
                </li>
                <li>
                  <Link href="001-quickstart-guide">
                    003-customizing-cells/cellRenderer
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </header>
        {children}
        <footer>footer</footer>
      </body>
    </html>
  );
}
