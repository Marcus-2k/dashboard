import { Box, CircularProgress, Typography } from "@mui/material";

export interface ProgressCardProps {
  progress: number;
}

export function ProgressCard({ progress }: ProgressCardProps) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress variant="determinate" value={progress} size={120} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(progress)}%`}</Typography>
      </Box>
    </Box>
  );
}
