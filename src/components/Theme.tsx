import { Button, Sheet, Typography, Table } from "@mui/joy";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import { Theme } from "../types/theme";

function truncateString(str: string): string {
  return str.length > 45 ? str.substring(0, 45) + "..." : str;
}

interface ThemeTableProps {
  themes: Theme[];
  handleThemeClick: (theme: Theme) => void;
}

export const ThemeTable = ({ themes, handleThemeClick }: ThemeTableProps) => {
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
            <th>Folder</th>
            <th>Description</th>
            <th>Tag</th>
          </tr>
        </thead>
        <tbody>
          {themes.map((theme, index) => (
            <tr onClick={() => handleThemeClick(theme)}>
              <td key={index}>{index + 1}</td>
              <td key={theme.title}>
                <Typography
                  level="title-sm"
                  startDecorator={<FolderRoundedIcon color="primary" />}
                  sx={{ alignItems: "flex-start" }}
                >
                  {theme.title}({theme.songs.length})
                </Typography>
              </td>
              <td key={`${theme.title}-description`}>
                {truncateString(theme.description)}
              </td>
              <td key={`${theme.title}-tags`}>
                {theme.tags.map((tag, index) => (
                  <Button
                    key={index}
                    style={{ margin: "5px" }}
                    variant="soft"
                    size="sm"
                  >
                    {tag}
                  </Button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};
