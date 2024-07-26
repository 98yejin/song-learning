import React from "react";
import { Box, Table } from "@mui/joy";
interface StudyResultsProps {
  results: boolean[];
  currentIndex: number;
  onIndexChange: (newIndex: number) => void;
}

const StudyResults: React.FC<StudyResultsProps> = ({
  results,
  currentIndex,
  onIndexChange,
}) => {
  const totalCorrect = results.filter((result) => result).length;
  const startIndex = Math.max(0, Math.floor(currentIndex / 10) * 10);
  const endIndex = Math.min(results.length, startIndex + 10);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Table>
        <thead>
          <tr>
            {Array.from({ length: 10 }, (_, i) => startIndex + i + 1).map(
              (num) => (
                <th key={num} style={{ textAlign: "center", padding: "8px" }}>
                  {num}
                </th>
              )
            )}
            <th style={{ textAlign: "center", padding: "8px" }}>Total Score</th>{" "}
          </tr>
        </thead>
        <tbody>
          <tr>
            {results.slice(startIndex, endIndex).map((result, index) => (
              <td
                onClick={() => onIndexChange(startIndex + index)}
                key={startIndex + index}
                style={{
                  textAlign: "center",
                  padding: "8px",
                  backgroundColor:
                    startIndex + index === currentIndex
                      ? "lightblue"
                      : "inherit",
                }}
              >
                {result ? "O" : "X"}
              </td>
            ))}
            <td
              key="totalScore"
              style={{ textAlign: "center", padding: "8px" }}
            >
              {totalCorrect} / {results.length}
            </td>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
};

export default StudyResults;
