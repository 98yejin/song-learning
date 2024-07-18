// Header.tsx
import React from "react";
import { Box, Typography } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";

const Header: React.FC = () => {
  const handleHomeClick = () => {
    window.location.href = "/";
  };
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton variant="outlined" onClick={handleHomeClick}>
          <HomeIcon />
        </IconButton>
        <Typography style={{ fontSize: "0.9rem" }}>
          98yejin /{" "}
          <Typography component="span" style={{ fontWeight: 500 }}>
            song-learning
          </Typography>
        </Typography>
      </Box>
      <IconButton
        component="a"
        href="https://github.com/98yejin/song-learning"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </IconButton>
    </Box>
  );
};

export default Header;
