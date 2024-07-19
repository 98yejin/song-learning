// AboutPage.tsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Theme } from "../types/theme";

import { Sheet, Typography } from "@mui/joy";
import BookRoundedIcon from "@mui/icons-material/BookRounded";

import Header from "../components/Header";
import { SongNotFound, SongTable } from "../components/Song";

interface ThemeDescriptionProps {
  description: string;
}

const ThemeDescription: React.FC<ThemeDescriptionProps> = (
  props: ThemeDescriptionProps
) => {
  return (
    <Sheet
      sx={{
        p: 2,
        m: 2,
        borderRadius: "sm",
        backgroundColor: "white",
      }}
    >
      <Typography
        component="span"
        style={{ fontSize: "0.9rem" }}
        startDecorator={<BookRoundedIcon color="primary" />}
      >
        {props.description}
      </Typography>
    </Sheet>
  );
};

const ThemePage: React.FC = () => {
  const location = useLocation();
  const theme = location.state as Theme;

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSongClick = async (song: string) => {
    try {
      const songData = await import(
        `../config/${theme.title.replace(/ /g, "")}/${song}`
      );
    } catch (error) {
      console.error("Song file not found:", error);
      setShowModal(true);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <Header location={theme.title} type="folder" />
      <ThemeDescription description={theme.description} />
      <SongTable songs={theme.songs} handleSongClick={handleSongClick} />
      <SongNotFound showModal={showModal} handleCloseModal={handleCloseModal} />
    </div>
  );
};

export default ThemePage;
