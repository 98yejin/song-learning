import React from "react";
import { IconButton, Tooltip } from "@mui/joy";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

interface SpeakerButtonProps {
  text: string;
  tts: boolean;
}

const SpeakerButton: React.FC<SpeakerButtonProps> = ({ text, tts }) => {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };
  if (tts) {
    speak();
  }

  return (
    <Tooltip title="Listen to the lyric">
      <IconButton onClick={speak} color="primary">
        <VolumeUpIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SpeakerButton;
