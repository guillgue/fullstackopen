import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS, ME } from "../queries";
import BookTable from "./BookTable";

const Recommend = ({ show }) => {
  const me_result = useQuery(ME);
  const books_result = useQuery(ALL_BOOKS, {
    variables:
      me_result.loading || !me_result?.data?.me
        ? {}
        : { genre: me_result.data.me.favoriteGenre },
  });

  const user = me_result?.data?.me;
  const books = books_result?.data?.allBooks;

  if (!show || !user) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      {me_result.loading ? null : (
        <>
          books in your favorite genre <strong>{user.favoriteGenre}</strong> for
          you, {user.username}:
        </>
      )}
      {books_result.loading ? (
        <div>loading...</div>
      ) : (
        <BookTable books={books} />
      )}
    </div>
  );
};

export default Recommend;
