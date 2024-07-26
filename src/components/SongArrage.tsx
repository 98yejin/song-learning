import React, { useEffect, useState } from "react";
import { SongActionProps } from "../types/song";
import { Box, Button, Snackbar, SnackbarProps, Typography } from "@mui/joy";
import SpeakerButton from "./SpeakerButton";

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const SongArrange: React.FC<SongActionProps> = ({
  lyric,
  tts,
  onResultUpdate,
}) => {
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    const words = lyric.english.split(" ");
    const shuffled = shuffleArray(words);
    setOrderedWords(shuffled);
  }, [lyric]);

  const [color, setColor] = useState<SnackbarProps["color"]>("neutral");
  const [open, setOpen] = useState(false);

  const checkAnswer = () => {
    const orderedSentence = orderedWords.join(" ");
    const isCorrectOrder =
      orderedSentence.toLowerCase() === lyric.english.toLowerCase();
    onResultUpdate(isCorrectOrder);
    if (isCorrectOrder) {
      setColor("success");
      setMessage("Great!");
    } else {
      setColor("danger");
      setMessage("Try Again...");
    }
    setOpen(true);
  };

  const onDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text"));
    const newWords = [...orderedWords];
    const [removed] = newWords.splice(dragIndex, 1);
    newWords.splice(dropIndex, 0, removed);
    setOrderedWords(newWords);
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
      <Typography sx={{ maxWidth: "80%", fontSize: "1rem" }}>
        Arrange the words to form the correct sentence:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          maxWidth: "80%",
          justifyContent: "center",
        }}
      >
        {orderedWords.map((word, index) => (
          <Box
            key={index}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, index)}
            sx={{
              padding: 1,
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "move",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "lightblue",
              },
            }}
          >
            <Typography sx={{ fontSize: "1.5rem" }}>{word}</Typography>
          </Box>
        ))}
      </Box>
      <Button onClick={checkAnswer}>Check</Button>
      <Snackbar
        open={open}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        color={color}
        variant="soft"
        size="lg"
        onClose={() => setOpen(false)}
      >
        <Typography>{message}</Typography>
      </Snackbar>
    </Box>
  );
};

export default SongArrange;
