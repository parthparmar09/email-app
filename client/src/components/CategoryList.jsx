import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { EmailCategories } from "@constants";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "@app";

function CategoryList() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  return (
    <List>
      {Object.keys(EmailCategories).map((cat) => (
        <ListItem key={cat} disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 2.5,
              color: category === cat ? "primary.light" : "primary.dark",
            }}
            onClick={() => dispatch(setCategory(cat))}
          >
            <Box
              className="flex-centered"
              sx={{ height: 1, width: 1, justifyContent: "flex-start", gap: 2 }}
            >
              {EmailCategories[cat]}

              <Typography fontWeight="500">{cat}</Typography>
            </Box>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default CategoryList;
