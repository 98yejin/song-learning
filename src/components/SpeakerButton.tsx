import React from "react";
import { IconButton, Tooltip } from "@mui/joy";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

interface SpeakerButtonProps {
  text: string;
}

const SpeakerButton: React.FC<SpeakerButtonProps> = ({ text }) => {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <Tooltip title="Listen to the lyric">
      <IconButton onClick={speak} color="primary">
        <VolumeUpIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SpeakerButton;
