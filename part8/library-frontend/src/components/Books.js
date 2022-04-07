import React, { useState } from "react";
import BookTable from "./BookTable";

const Books = (props) => {
  const [genre, setGenre] = useState("");

  const filteredBooks =
    genre === ""
      ? props.books
      : props.books.filter((b) => b.genres.includes(genre));

  // problem: recomputed each time we select a genre
  const genres = new Set();
  props.books.forEach((b) => b.genres.forEach((g) => genres.add(g)));

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <BookTable books={filteredBooks} />
      {[...genres].map((g) => (
        <button key={g} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre("")}>all genres</button>
    </div>
  );
};

export default Books;
