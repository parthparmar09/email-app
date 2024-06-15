import { CancelRounded, SearchRounded } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <TextField
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
        },
      }}
      placeholder="Search..."
      fullWidth={true}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRounded />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <CancelRounded
              sx={{ display: searchTerm ? "block" : "none", cursor: "pointer" }}
              onClick={() => setSearchTerm("")}
            />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBar;
