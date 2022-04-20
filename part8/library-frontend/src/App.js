import { useApolloClient, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS, ALL_GENRES } from "./queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const title = subscriptionData.data.bookAdded.title;
      const author = subscriptionData.data.bookAdded.author.name;

      window.alert(`book ${title} by ${author} added`);

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(subscriptionData.data.bookAdded),
        };
      });

      client.cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors
            .map((a) => a.name)
            .includes(subscriptionData.data.bookAdded.author.name)
            ? allAuthors
            : allAuthors.concat(subscriptionData.data.bookAdded.author),
        };
      });

      client.cache.updateQuery({ query: ALL_GENRES }, ({ allGenres }) => {
        let newGenres = allGenres;
        for (let genre of subscriptionData.data.bookAdded.genres) {
          if (!newGenres.includes(genre)) {
            newGenres = newGenres.concat(genre);
          }
        }
        return {
          allGenres: newGenres,
        };
      });

      for (let genre of subscriptionData.data.bookAdded.genres) {
        try {
          client.cache.updateQuery(
            { query: ALL_BOOKS, variables: { genre } },
            ({ allBooks }) => {
              return {
                allBooks: allBooks.concat(subscriptionData.data.bookAdded),
              };
            }
          );
        } catch {}
      }
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    setToken(token);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    if (page === "add" || page === "recommend") {
      setPage("books");
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} token={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
