// AboutPage.tsx
import React from "react";
import { useLocation } from "react-router-dom";

import { Box, Sheet, Typography } from "@mui/joy";
import BookRoundedIcon from "@mui/icons-material/BookRounded";

import Header from "../components/Header";
import SongCopy from "../components/SongCopy";
import SongArrange from "../components/SongArrage";
import SongTranslate from "../components/SongTranslate";
import StudyResults from "../components/SongResult";
import { ActionGroup, ChangeIndexGroup } from "../components/Song";
import { Song } from "../types/song";

interface DescriptionProps {
  description: string;
}

interface SongProps {
  songData: Song;
  action: string;
  theme: string;
}

const Description: React.FC<DescriptionProps> = (props: DescriptionProps) => {
  return (
    <Sheet
      sx={{
        p: 1,
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

const SongPage: React.FC = () => {
  const location = useLocation();
  const { songData, action, theme } = location.state as SongProps;
  const lyrics = songData.lyrics;
  const maxIndex = lyrics.length - 1;

  const [value, setValue] = React.useState<string | null>(action);
  const [index, setIndex] = React.useState<number>(0);
  const [studyResults, setStudyResults] = React.useState<boolean[]>(
    new Array(lyrics.length).fill(undefined)
  );

  const lyric = lyrics[index];

  const handleResultUpdate = (isCorrect: boolean) => {
    setStudyResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = isCorrect;
      return newResults;
    });
  };

  let content;
  if (value === "copy") {
    content = <SongCopy lyric={lyric} onResultUpdate={handleResultUpdate} />;
  } else if (value === "arrange") {
    content = <SongArrange lyric={lyric} onResultUpdate={handleResultUpdate} />;
  } else if (value === "translate") {
    content = (
      <SongTranslate lyric={lyric} onResultUpdate={handleResultUpdate} />
    );
  }

  return (
    <Box>
      <Header location={`${theme} / ${songData.title}`} type="song" />
      <ActionGroup value={value} setValue={setValue} />
      <Description description={songData.description} />
      {content}
      <ChangeIndexGroup index={index} maxIndex={maxIndex} setIndex={setIndex} />
      <StudyResults
        results={studyResults}
        currentIndex={index}
        onIndexChange={setIndex}
      />
    </Box>
  );
};

export default SongPage;
