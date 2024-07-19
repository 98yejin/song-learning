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

interface SongNotFoundProps {
  showModal: boolean;
  handleCloseModal: () => void;
}
export function SongNotFound({
  showModal,
  handleCloseModal,
}: SongNotFoundProps) {
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

function truncateString(str: string): string {
  return str.length > 45 ? str.substring(0, 45) + "..." : str;
}

interface SongTableProps {
  songs: string[];
  handleSongClick: (song: string) => void;
}

export const SongTable = ({ songs, handleSongClick }: SongTableProps) => {
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
                  Study
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};
