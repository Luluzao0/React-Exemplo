import "./styles.css";

import { useEffect, useState, useCallback } from "react";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export const Home = () => {
  //state = {
  //  // estado
  //  posts: [],
  //  allPosts: [],
  //  page: 0,
  //  postPerPage: 5,
  //  searchValue: "",
  //};

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState([0]);
  const [postPerPage] = useState([10]);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postPerPage >= allPosts.length;

  const filterPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts; // operação ternaria condição ? exp1 : exp2

  const handleLoadPosts = useCallback(async (page, postPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postPerPage);
  }, [handleLoadPosts, postPerPage]);

  const laodMorePosts = () => {
    const nextPage = page + postPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postPerPage); // fazendo pesquisa
    posts.push(...nextPost); // enchendo

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target; // evento com target
    setSearchValue(value);
  };

  // !! converte para booleano
  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search Value: {searchValue}</h1>}

        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>

      {filterPosts.length > 0 && <Posts posts={filterPosts} />}
      {filterPosts.length === 0 && <p>Não existem Postcards</p>}

      <div className="button-container">
        {!searchValue && (
          /* 
            button de busca baseado no valor inserido na busca
          */
          <Button
            text="Load more posts"
            onClick={laodMorePosts}
            disabled={noMorePosts}
            /* ajustando botão */
          />
        )}
      </div>
    </section>
  );
};

export default Home;
