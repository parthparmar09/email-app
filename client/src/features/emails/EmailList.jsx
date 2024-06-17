import { Box, List, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetEmailsQuery } from "./emailApi";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import EmailListFooter from "./EmailListFooter";
import EmailListItem from "./EmailListItem";
import emptyFolder from "@assets/empty-folder.svg";

function EmailList({ sx }) {
  const category = useSelector((state) => state.category);

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: emailData,
    isFetching,
    isError,
    refetch,
  } = useGetEmailsQuery({ category: category.toLowerCase(), searchTerm, page });
  const emails = emailData?.data?.emails;
  const total = emailData?.data?.total;

  useEffect(() => {
    setPage(1);
    refetch();
  }, [category, searchTerm]);

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <Paper elevation={0} sx={{ ...sx }}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isFetching ? (
        <h6>Loading...</h6>
      ) : isError || emails.length === 0 ? (
        <Box
          className="flex-centered"
          sx={{ height: 1, width: 1, flexDirection: "column" }}
        >
          <img src={emptyFolder} alt="No Mail" height="200" />
          <Typography variant="h6" color="text.secondary">
            Nothing in {category}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            This folder is empty
          </Typography>
        </Box>
      ) : (
        <>
          <List
            sx={{
              height: 0.875,
              overflowY: "scroll",
            }}
          >
            {emails?.map((email, i) => (
              <EmailListItem key={i} email={email} />
            ))}
          </List>
          <EmailListFooter page={page} total={total} setPage={setPage} />
        </>
      )}
    </Paper>
  );
}

export default EmailList;
