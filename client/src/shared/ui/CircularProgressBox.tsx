import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export interface CircularProgressBoxProps {
  size?: number;
}

export function CircularProgressBox({ size = 40 }: CircularProgressBoxProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size={size} />
    </Box>
  );
}
