import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Table,
  ToggleButtonGroup,
  Typography,
} from "@mui/joy";
import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface SongProps {
  showModal: boolean;
  handleCloseModal: () => void;
}

interface SongTableProps {
  theme: string;
  songs: string[];
}

interface ActionGroupProps {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ChangeIndexProps {
  index: number;
  maxIndex: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function SongNotFound({ showModal, handleCloseModal }: SongProps) {
  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <ModalDialog>
        <ModalClose />
        <Typography level="h4" component="h2">
          Song Not Found
        </Typography>
        <p>The selected song file does not exist.</p>
      </ModalDialog>
    </Modal>
  );
}

export const SongTable = ({ theme, songs }: SongTableProps) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSongClick = async (song: string, action: string) => {
    try {
      const songData = await import(
        `../config/${theme.replace(/ /g, "")}/${song.toLowerCase()}`
      );
      navigate(`/song/${song.toLowerCase()}`, {
        state: { songData: songData, action, theme },
      });
    } catch (error) {
      console.error("Song file not found:", error);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        p: 2,
        m: 2,
        borderRadius: "sm",
        backgroundColor: "background.surface",
      }}
    >
      <Table
        hoverRow
        size="sm"
        borderAxis="none"
        variant="soft"
        sx={{
          "--TableCell-paddingX": "1rem",
          "--TableCell-paddingY": "1rem",
          overflow: "scroll",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Index</th>
            <th>Song</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr>
              <td key={index}>{index + 1}</td>
              <td key={song}>
                <Typography
                  level="title-sm"
                  startDecorator={<AudioFileRoundedIcon color="primary" />}
                  sx={{ alignItems: "flex-start" }}
                >
                  {song}
                </Typography>
              </td>
              <td key={`${song}-action`}>
                <Button
                  key={`${index}-copy`}
                  style={{ margin: "5px" }}
                  variant="soft"
                  size="sm"
                  onClick={() => handleSongClick(song, "copy")}
                >
                  Copying
                </Button>
                <Button
                  key={`${index}-arrange`}
                  style={{ margin: "5px" }}
                  variant="soft"
                  size="sm"
                  onClick={() => handleSongClick(song, "arrange")}
                >
                  Arranging
                </Button>
                <Button
                  key={`${index}-translate`}
                  style={{ margin: "5px" }}
                  variant="soft"
                  size="sm"
                  onClick={() => handleSongClick(song, "translate")}
                >
                  Translate
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <SongNotFound showModal={showModal} handleCloseModal={handleCloseModal} />
    </Sheet>
  );
};

export const ActionGroup: React.FC<ActionGroupProps> = (
  props: ActionGroupProps
) => {
  const { value, setValue } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center", // This centers the children vertically
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          fontSize: "1rem",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <Checkbox label="Text-to-Speech" sx={{ fontSize: "0.8rem" }} />
        <Checkbox label="Auto Navigation" sx={{ fontSize: "0.8rem" }} />
      </Box>
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
    </Box>
  );
};

export const ChangeIndexGroup: React.FC<ChangeIndexProps> = (
  props: ChangeIndexProps
) => {
  const leftDisabled = props.index === 0;
  const rightDisabled = props.index === props.maxIndex;
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", m: 2 }}>
      <Button
        onClick={() => {
          props.setIndex(props.index - 1);
        }}
        disabled={leftDisabled}
        startDecorator={<ArrowBackIosNewIcon />}
      >
        Previous
      </Button>
      <Button
        onClick={() => {
          props.setIndex(props.index + 1);
        }}
        disabled={rightDisabled}
        endDecorator={<ArrowForwardIosIcon />}
      >
        Next
      </Button>
    </Box>
  );
};
