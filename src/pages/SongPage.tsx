// AboutPage.tsx
import React from "react";
import { useLocation } from "react-router-dom";

import { Sheet, Typography, ToggleButtonGroup, Button } from "@mui/joy";
import BookRoundedIcon from "@mui/icons-material/BookRounded";

import Header from "../components/Header";
import { Song } from "../types/song";

interface DescriptionProps {
  description: string;
}

interface SongProps {
  songData: Song;
  action: string;
  theme: string;
}

interface ActionGroupProps {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
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

const ActionGroup: React.FC<ActionGroupProps> = (props: ActionGroupProps) => {
  const { value, setValue } = props;
  return (
    <ToggleButtonGroup
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "1rem",
      }}
    >
      <Button value="copy">Copying</Button>
      <Button value="arrange">Arranging</Button>
      <Button value="translate">Translate</Button>
    </ToggleButtonGroup>
  );
};

const SongPage: React.FC = () => {
  const location = useLocation();
  const { songData, action, theme } = location.state as SongProps;

  const [value, setValue] = React.useState<string | null>(action);
  return (
    <div>
      <div>
        <Header location={`${theme} / ${songData.title}`} type="song" />
        <ActionGroup value={value} setValue={setValue} />
        <Description description={songData.description} />
      </div>
    </div>
  );
};

export default SongPage;
