import { Button, Sheet, Typography, Table } from "@mui/joy";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import { Theme } from "../types/theme";

function truncateString(str: string): string {
  return str.length > 45 ? str.substring(0, 45) + "..." : str;
}

export function themeTable(
  themes: Theme[],
  handleThemeClick: (theme: Theme) => void
) {
  return (
    <Sheet variant="outlined" sx={{ p: 2, mt: 2 }}>
      <Typography level="h4" component="h2" sx={{ mb: 1 }}>
        Themes
      </Typography>
      <Table>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>Index</th>
            <th>Folder</th>
            <th style={{ width: "40%" }}>Description</th>
            <th>Tag</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {themes.map((theme, index) => (
            <tr>
              <td key={index}>{index + 1}</td>
              <td key={theme.title}>
                <Typography
                  level="title-sm"
                  startDecorator={<FolderRoundedIcon color="primary" />}
                  sx={{ alignItems: "flex-start" }}
                >
                  {theme.title}
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
              <td key={`${theme.title}-action`}>
                <Button onClick={() => handleThemeClick(theme)}>Select</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
