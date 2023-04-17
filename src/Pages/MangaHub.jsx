import { useState, useEffect } from "react";

const MangaHub = () => {
  const [mangaTrendingData, setMangaTrendingData] = useState([]);

  let query = `
  query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(search: $search, type: MANGA, sort: TRENDING_DESC) {
        id
        title {
          romaji
        }
        type
        coverImage {
          extraLarge
        }
      }
    }
  }
  `;

  let variables = {
    page: 1,
    perPage: 10,
  };

  useEffect(() => {
    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMangaTrendingData(data.data.Page.media));
  }, []);

  return (
    <div className="hubPage">
      <h1>Manga Hub</h1>
      {/* {mangaTrendingData?.forEach((manga) => console.log(manga))} */}
    </div>
  );
};

export default MangaHub;
