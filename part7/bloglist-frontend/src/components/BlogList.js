import React from "react";
import { Link } from "react-router-dom";

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const BlogList = ({ blogList }) => {
  const sortedBlogs = [...blogList].sort((a, b) => b.likes - a.likes);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {sortedBlogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
              <TableCell>by {blog.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlogList;
