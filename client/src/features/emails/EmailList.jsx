import { List, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetEmailsQuery } from "./emailApi";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

function EmailList({ sx }) {
  const category = useSelector((state) => state.category);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: emails,
    loading,
    isError,
    refetch,
  } = useGetEmailsQuery({ category: category.toLowerCase(), searchTerm });

  useEffect(() => {
    refetch();
  }, [category, searchTerm]);
  useEffect(() => {
    console.log(emails);
  }, [emails]);
  return (
    <Paper elevation={0} sx={{ ...sx }}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={searchTerm} />
      <List sx={{ mt: 1 }}>Email List</List>
    </Paper>
  );
}

export default EmailList;
