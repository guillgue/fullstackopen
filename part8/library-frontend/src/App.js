import { useApolloClient, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

import { ALL_DATA } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  // not sure about this, how is it done in the correction?
  // maybe one query for each of books, authors
  // but it is nice to request everything once
  const result = useQuery(ALL_DATA);

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    setToken(token);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    if (page === "add") {
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
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      {result.loading ? (
        <div>loading...</div>
      ) : (
        <>
          <Authors
            show={page === "authors"}
            authors={result.data.allAuthors}
            token={token}
          />
          <Books show={page === "books"} books={result.data.allBooks} />
          <NewBook show={page === "add"} />
          <LoginForm
            show={page === "login"}
            setToken={setToken}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
};

export default App;
