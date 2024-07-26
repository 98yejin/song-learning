import { SetStateAction, useState } from "react";
import { SongActionProps } from "../types/song";
import {
  Box,
  Button,
  Input,
  Snackbar,
  SnackbarProps,
  Typography,
} from "@mui/joy";
import SpeakerButton from "./SpeakerButton";

const SongTranslate: React.FC<SongActionProps> = ({
  lyric,
  tts,
  onResultUpdate,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<SnackbarProps["color"]>("neutral");
  const [open, setOpen] = useState(false);

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      checkAnswer();
    }
  };

  const checkAnswer = () => {
    const isCorrect =
      inputValue.toLowerCase().replace(/[^a-z0-9]/g, "") ===
      lyric.english.toLowerCase().replace(/[^a-z0-9]/g, "");
    onResultUpdate(isCorrect);
    if (isCorrect) {
      setColor("success");
      setMessage("Great!");
    } else {
      setColor("danger");
      setMessage("Try Again...");
    }
    setOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "40vh",
        width: "100vw",
        margin: "0 auto",
        gap: "2rem",
      }}
    >
      <Typography sx={{ maxWidth: "80%", fontSize: "1.5rem" }}>
        {lyric.korean}
        <SpeakerButton text={lyric.english} tts={tts} />
      </Typography>
      <Input
        fullWidth
        sx={{ maxWidth: "80%", fontSize: "1.5rem" }}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <Button onClick={checkAnswer}>Check</Button>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        color={color}
        variant="soft"
        size="lg"
        invertedColors
        onClose={() => {
          setOpen(false);
        }}
      >
        <Typography>{message}</Typography>
      </Snackbar>
    </Box>
  );
};

export default SongTranslate;
