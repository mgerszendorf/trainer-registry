import { TrainerRegistryForm } from "@/components/forms/TrainerRegistryForm/TrainerRegistryForm";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <TrainerRegistryForm />
    </Box>
  );
}
