import { Component } from "react";

import "./styles.css";

import { loadPosts } from "../../utils/load-posts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

class Home extends Component {
  state = {
    // estado
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 5,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postPerPage),
      allPosts: postsAndPhotos,
    });
  };

  laodMorePosts = () => {
    const { page, postPerPage, allPosts, posts } = this.state;
    const nextPage = page + postPerPage;
    const nextPost = allPosts.slice(nextPage, nextPage + postPerPage); // fazendo pesquisa
    posts.push(...nextPost); // enchendo

    this.setState({ posts, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target; // evento com target
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;
    // !! converte para booleano

    const filterPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts; // operação ternaria condição ? exp1 : exp2

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Search Value: {searchValue}</h1>}

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
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
              onClick={this.laodMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}
export default Home;
