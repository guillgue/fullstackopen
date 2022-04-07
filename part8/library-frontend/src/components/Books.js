import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import BookTable from "./BookTable";
import { ALL_BOOKS, ALL_GENRES } from "../queries";

const Books = (props) => {
  const [genre, setGenre] = useState("");

  const books_result = useQuery(ALL_BOOKS, {
    variables: genre === "" ? {} : { genre },
  });

  const genres_result = useQuery(ALL_GENRES);

  if (!props.show) {
    return null;
  }

  const books = books_result?.data?.allBooks;
  const genres = genres_result?.data?.allGenres;

  return (
    <div>
      <h2>books</h2>
      {books_result.loading ? (
        <div>loading...</div>
      ) : (
        <BookTable books={books} />
      )}
      {genres_result.loading ? null : (
        <div>
          {genres.map((g) => (
            <button key={g} onClick={() => setGenre(g)}>
              {g}
            </button>
          ))}
          <button onClick={() => setGenre("")}>all genres</button>
        </div>
      )}
    </div>
  );
};

export default Books;
