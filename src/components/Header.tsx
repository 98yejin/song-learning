// Header.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from "@mui/icons-material/GitHub";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";

const LocationTypography: React.FC<{ location: string; type?: string }> = ({
  location,
  type,
}) => {
  if (type) {
    const decorator =
      type == "folder" ? (
        <FolderRoundedIcon color="primary" />
      ) : (
        <AudioFileRoundedIcon color="primary" />
      );
    return (
      <Typography
        startDecorator={decorator}
        style={{ fontSize: "0.9rem", cursor: "default" }}
      >
        {location}
      </Typography>
    );
  }
  return (
    <Typography style={{ fontSize: "0.9rem", cursor: "default" }}>
      {location}
    </Typography>
  );
};

type HeaderProps = {
  location: string;
  type?: string;
};

export const Header: React.FC<HeaderProps> = ({ location, type }) => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
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
        <Typography style={{ fontSize: "0.9rem", cursor: "default" }}>
          98yejin /{" "}
          <Typography component="span" style={{ fontWeight: 500 }}>
            song-learning
          </Typography>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          left: 0,
          right: 0,
        }}
      >
        <LocationTypography location={location} type={type} />
      </Box>

      <Box>
        <IconButton onClick={handleHomeClick}>
          <HomeIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://github.com/98yejin/song-learning"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

type SongHeaderProps = {
  theme: string;
  song: string;
};

export const SongHeader: React.FC<SongHeaderProps> = ({ theme, song }) => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
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
        <LocationTypography location={theme} type="folder" />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          left: 0,
          right: 0,
        }}
      >
        <LocationTypography location={song} type="song" />
      </Box>
      <Box>
        <IconButton onClick={handleHomeClick}>
          <HomeIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://github.com/98yejin/song-learning"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
