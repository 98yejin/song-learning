// AboutPage.tsx
import React from "react";
import { useLocation } from "react-router-dom";

import { Sheet, Typography } from "@mui/joy";
import BookRoundedIcon from "@mui/icons-material/BookRounded";

import Header from "../components/Header";
import { Song } from "../types/song";
import SongCopy from "../components/SongCopy";
import SongArrange from "../components/SongArrage";
import SongTranslate from "../components/SongTranslate";
import { ActionGroup, ChangeIndexGroup } from "../components/Song";

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
  const lyric = lyrics[index];

  let content;
  if (value === "copy") {
    content = <SongCopy lyric={lyric} />;
  } else if (value === "arrange") {
    content = <SongArrange lyric={lyric} />;
  } else if (value === "translate") {
    content = <SongTranslate lyric={lyric} />;
  }
  return (
    <div>
      <Header location={`${theme} / ${songData.title}`} type="song" />
      <ActionGroup value={value} setValue={setValue} />
      <Description description={songData.description} />
      {content}
      <ChangeIndexGroup index={index} maxIndex={maxIndex} setIndex={setIndex} />
    </div>
  );
};

export default SongPage;
