import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import SearchInput from "./SearchInput/SearchInput";

export default function BasicCard() {
  return (
    <Card
      sx={{
        padding: "10px 20px",
        display: "flex",
        alignItems: "center ",
        justifyContent: "space-between",
        gap: "1rem",
      }}>
      <Button variant="contained">Add Staff</Button>
      <SearchInput />
    </Card>
  );
}
