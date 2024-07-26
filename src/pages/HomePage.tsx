// App.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "@mui/joy";
import themeConfig from "../config/theme.json";
import { SongNotFound } from "../components/Song";
import { Theme } from "../types/theme";
import { ThemeTable } from "../components/Theme";
import Header from "../components/Header";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [themes, setThemes] = useState<Theme[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const themes = Object.values(themeConfig);
    setThemes(themes);
  }, []);

  const handleThemeClick = (theme: Theme) => {
    navigate(`/theme/${theme.title.toLowerCase().replace(/ /g, "-")}`, {
      state: theme,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header location="Forder Table" />
      <Container>
        <ThemeTable themes={themes} handleThemeClick={handleThemeClick} />
        <SongNotFound
          showModal={showModal}
          handleCloseModal={handleCloseModal}
        />
      </Container>
    </>
  );
};

export default HomePage;
