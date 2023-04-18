import { useState, useEffect } from "react";
import { firestore } from "../firebase_setup/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Post from "../Components/Post";

const AnimeHub = () => {
  const [animeTrendingData, setAnimeTrendingData] = useState([]);
  const [animeDiscussionPost, setAnimeDiscussionPost] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const navigate = useNavigate();

  let queries = `
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
        query: queries,
        variables: variables,
      }),
    })
      .then((res) => res.json())
      .then((data) => setAnimeTrendingData(data.data.Page.media));
  }, []);

  const animePostsRef = collection(firestore, "AnimePosts");
  const animePostQuery = query(animePostsRef, orderBy(order, "desc"));

  useEffect(
    () =>
      onSnapshot(animePostQuery, (snapshot) =>
        setAnimeDiscussionPost(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      ),
    [order]
  );

  return (
    <div className="hubPage">
      <h1>Anime Hub</h1>
      <div className="grid grid-cols-3">
        <div className="col-start-2">
          <div className="bg-slate-600 py-4 px-2 my-3 rounded-lg">
            <Link to="/create-post" state={{ previousPage: "AnimeHub" }}>
              <input
                type="text"
                className="w-full h-10 rounded-full px-3 bg-slate-800 hover:bg-slate-900 text-center text-xl"
                placeholder="Create Post"
              />
            </Link>
          </div>
          <div className="bg-slate-600 py-2 px-3 text-lg rounded-lg text-white font-semibold">
            <span>Order by: </span>
            <select name="orderBy" id="orderBy" onChange={(e) => setOrder(e.target.value)} className="bg-slate-800 rounded-lg text-center" >
              <option value="createdAt">Newest</option>
              <option value="upVote">Most Popular</option>
            </select>
          </div>
          {animeDiscussionPost?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        <div></div>
      </div>
      {/* {animeTrendingData?.forEach((anime) => console.log(anime))} */}
    </div>
  );
};

export default AnimeHub;
