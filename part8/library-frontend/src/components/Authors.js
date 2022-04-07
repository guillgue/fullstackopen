import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ALL_AUTHORS, EDIT_BORN } from "../queries";

const Authors = (props) => {
  const [born, setBorn] = useState("");

  const result = useQuery(ALL_AUTHORS);
  const authors = result?.data?.allAuthors;

  const [changeBorn] = useMutation(EDIT_BORN);

  const [selected, setSelected] = useState(authors ? authors[0] : "");

  const submit = async (event) => {
    event.preventDefault();

    changeBorn({ variables: { name: selected, setBornTo: Number(born) } });

    setBorn("");
  };

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ? (
        <>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              name
              <select
                value={selected}
                onChange={({ target }) => setSelected(target.value)}
              >
                {authors.map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              born
              <input
                value={born}
                type="number"
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type="submit">update author</button>
          </form>{" "}
        </>
      ) : null}
    </div>
  );
};

export default Authors;
