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

const SongCopy: React.FC<SongActionProps> = (props: SongActionProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(undefined);
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
    setIsCorrect(
      inputValue.toLowerCase() === props.lyric.english.toLowerCase()
    );
    setColor(isCorrect ? "success" : "danger");
    setOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        width: "100vw",
        margin: "0 auto",
        gap: "2rem",
      }}
    >
      <Typography sx={{ maxWidth: "80%", fontSize: "1.5rem" }}>
        {props.lyric.english}
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
        <Typography>{isCorrect ? "Great!" : "Try Agrain..."}</Typography>
      </Snackbar>
    </Box>
  );
};

export default SongCopy;
