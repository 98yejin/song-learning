import {
  Button,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Table,
  Typography,
} from "@mui/joy";
import AudioFileRoundedIcon from "@mui/icons-material/AudioFileRounded";
import { Song } from "../types/song";
import { useState } from "react";

interface SongProps {
  showModal: boolean;
  handleCloseModal: () => void;
}

interface SongTableProps {
  theme: string;
  songs: string[];
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
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSongClick = async (song: string) => {
    try {
      const songData = await import(
        `../config/${theme.replace(/ /g, "")}/${song}`
      );
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
            <tr onClick={() => handleSongClick(song)}>
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
                  key={index}
                  style={{ margin: "5px" }}
                  variant="soft"
                  size="sm"
                >
                  Copying
                </Button>
                <Button
                  key={index}
                  style={{ margin: "5px" }}
                  variant="soft"
                  size="sm"
                >
                  Arranging
                </Button>
                <Button
                  key={index}
                  style={{ margin: "5px" }}
                  variant="soft"
                  size="sm"
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
