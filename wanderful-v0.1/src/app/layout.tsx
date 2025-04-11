"use client"; // Ensure this is a client component

import BlogHomePage from "../components/blog/home-page";

const Home = () => {
  return (
    <html>
      <div>
        <h1>Welcome to the Blog</h1>
        <body>
          <BlogHomePage />
        </body>
      </div>
    </html>
  );
};

export default Home;
