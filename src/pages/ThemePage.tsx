import React from "react";
import { useLocation } from "react-router-dom";
import { Theme } from "../types/theme";

import { Sheet, Typography } from "@mui/joy";
import BookRoundedIcon from "@mui/icons-material/BookRounded";

import { Header } from "../components/Header";
import { SongTable } from "../components/Song";

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

  return (
    <div>
      <Header location={theme.title} type="folder" />
      <ThemeDescription description={theme.description} />
      <SongTable theme={theme.title} songs={theme.songs} />
    </div>
  );
};

export default ThemePage;
