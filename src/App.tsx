// App.tsx
import React, { useState, useEffect } from "react";
import { Container, Typography, List, ListItem, Sheet } from "@mui/joy";
import themeConfig from "./config/theme.json";
import { songNotFound } from "./components/Song";
import { Song } from "./types/song";

const App: React.FC = () => {
  const [themes, setThemes] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const themeNames = Object.keys(themeConfig);
    setThemes(themeNames);
  }, []);

  const handleThemeClick = (theme: string) => {
    setSelectedTheme(theme);
    setSelectedSong(null);
  };

  const handleSongClick = async (song: string) => {
    try {
      const songData = await import(`./config/${selectedTheme}/${song}`);
      setSelectedSong(songData.default);
    } catch (error) {
      console.error("Song file not found:", error);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <Sheet variant="outlined" sx={{ p: 2, mt: 2 }}>
        <Typography level="h4" component="h2" sx={{ mb: 1 }}>
          Themes
        </Typography>
        <List>
          {themes.map((theme) => (
            <ListItem key={theme} onClick={() => handleThemeClick(theme)}>
              {theme}
            </ListItem>
          ))}
        </List>
      </Sheet>
      {selectedTheme && (
        <Sheet variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography level="h4" component="h2" sx={{ mb: 1 }}>
            Songs in {selectedTheme}
          </Typography>
          <List>
            {themeConfig[selectedTheme as keyof typeof themeConfig].map(
              (song) => (
                <ListItem key={song} onClick={() => handleSongClick(song)}>
                  {song.replace(".json", "")}
                </ListItem>
              )
            )}
          </List>
        </Sheet>
      )}
      {selectedSong && (
        <Sheet variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography level="h4" component="h2">
            Learning Page for {selectedSong.title}
          </Typography>
          <Typography>{selectedSong.description}</Typography>
          <Typography component="h3">Lyrics</Typography>
          {selectedSong.lyrics.map((lyric, index) => (
            <div key={index}>
              <Typography>English: {lyric.english}</Typography>
              <Typography>Korean: {lyric.korean}</Typography>
            </div>
          ))}
        </Sheet>
      )}
      {songNotFound(showModal, handleCloseModal)}
    </Container>
  );
};

export default App;
