import { useQuery } from "@apollo/client";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import { ALL_DATA } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");

  // not sure about this, how is it done in the correction?
  // maybe one query for each of books, authors
  // but it is nice to request everything once
  const result = useQuery(ALL_DATA);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      {result.loading ? (
        <div>loading...</div>
      ) : (
        <>
          <Authors show={page === "authors"} authors={result.data.allAuthors} />
          <Books show={page === "books"} books={result.data.allBooks} />
          <NewBook show={page === "add"} />
        </>
      )}
    </div>
  );
};

export default App;
