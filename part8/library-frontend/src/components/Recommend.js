import React from "react";
import BookTable from "./BookTable";

const Recommend = ({ show, books, user }) => {
  if (!show) {
    return null;
  }

  const filteredBooks = books.filter((b) =>
    b.genres.includes(user.favoriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <strong>{user.favoriteGenre}</strong>
      <BookTable books={filteredBooks} />
    </div>
  );
};

export default Recommend;
