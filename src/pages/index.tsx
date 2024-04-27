import TopBar from "@/components/TopBar";
import StaffViewer from "@/components/StaffViewer";
import Footer from "@/components/Footer";
import ActionsBar from "@/components/ActionsBar/ActionsBar";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minHeight: "100vh",
        bgcolor: (theme) => theme.palette.background.default,
      }}>
      <header>
        <TopBar />
      </header>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          bgcolor: (theme) => theme.palette.background.default,
        }}>
        <ActionsBar />
        <StaffViewer />
      </Box>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
}
