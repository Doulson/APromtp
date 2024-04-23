import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "APrompt",
  description: "Get A Prompt A Day",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            <div className="w-full">{children}</div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
