import { useState, useEffect } from "react";
import { firestore } from "../firebase_setup/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Post from "../Components/Post";

const MangaHub = () => {
  const [mangaTrendingData, setMangaTrendingData] = useState([]);
  const [mangaDiscussionPost, setMangaDiscussionPost] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const navigate = useNavigate();

  let queries = `
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
        query: queries,
        variables: variables,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMangaTrendingData(data.data.Page.media));
  }, []);

  const mangaPostsRef = collection(firestore, "MangaPosts");
  const mangaPostQuery = query(mangaPostsRef, orderBy(order, "desc"));

  useEffect(
    () =>
      onSnapshot(mangaPostQuery, (snapshot) =>
        setMangaDiscussionPost(
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
      <h1>Manga Hub</h1>
      <div className="grid grid-cols-3">
        <div className="col-start-2">
          <div className="createPost">
            <Link to="/create-post" state={{ previousPage: "MangaHub" }}>
              <input type="text" placeholder="Create Post" />
            </Link>
          </div>
          <div className="postContainer">
            <span>Order by: </span>
            <select
              name="orderBy"
              id="orderBy"
              onChange={(e) => setOrder(e.target.value)}>
              <option value="createdAt">Newest</option>
              <option value="upVote">Most Popular</option>
            </select>
          </div>
          {mangaDiscussionPost?.map((post) => (
            <Post key={post.id} post={post} hubType="Manga" />
          ))}
        </div>
      </div>
      {/* {mangaTrendingData?.forEach((manga) => console.log(manga))} */}
    </div>
  );
};

export default MangaHub;
