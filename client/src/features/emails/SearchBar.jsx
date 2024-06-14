import { SearchRounded } from "@mui/icons-material";
import { InputAdornment, TextField, styled } from "@mui/material";

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
      }}
    />
  );
}

export default SearchBar;
