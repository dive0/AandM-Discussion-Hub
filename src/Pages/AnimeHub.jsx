import { useState, useEffect } from "react";

const AnimeHub = () => {
  const [animeTrendingData, setAnimeTrendingData] = useState([])

  let query = `
  query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(search: $search, type: ANIME, sort: TRENDING_DESC) {
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
      .then((data) => setAnimeTrendingData(data.data.Page.media));
  }, [])

  return (<>
    <h1></h1>
    {animeTrendingData?.forEach((anime) => console.log(anime))}
  </>);
};

export default AnimeHub;
