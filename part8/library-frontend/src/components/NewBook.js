import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, CREATE_BOOK } from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        };
      });

      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors
            .map((a) => a.name)
            .includes(response.data.addBook.author.name)
            ? allAuthors
            : allAuthors.concat(response.data.addBook.author),
        };
      });

      cache.updateQuery({ query: ALL_GENRES }, ({ allGenres }) => {
        let newGenres = allGenres;
        for (let genre of response.data.addBook.genres) {
          if (!newGenres.includes(genre)) {
            newGenres = newGenres.concat(genre);
          }
        }
        return {
          allGenres: newGenres,
        };
      });

      for (let genre of response.data.addBook.genres) {
        try {
          cache.updateQuery(
            { query: ALL_BOOKS, variables: { genre } },
            ({ allBooks }) => {
              return {
                allBooks: allBooks.concat(response.data.addBook),
              };
            }
          );
        } catch {}
      }
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: { title, author, published: Number(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
