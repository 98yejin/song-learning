// Header.tsx
import React from "react";
import { Box, Typography } from "@mui/joy";
import QueueMusicTwoToneIcon from "@mui/icons-material/QueueMusicTwoTone";

const Header: React.FC = () => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        bgcolor: "background.surface",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography level="h4" component="h4">
        <QueueMusicTwoToneIcon />
        LEARN ENGLISH WITH SONGS
      </Typography>
    </Box>
  );
};

export default Header;
