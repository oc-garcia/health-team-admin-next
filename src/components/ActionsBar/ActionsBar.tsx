import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchInput from "./SearchInput/SearchInput";

export default function BasicCard() {
  return (
    <Card sx={{ padding: "10px 20px", display: "flex", alignItems: "center ", justifyContent: "space-between" }}>
      <Button size="large" variant="contained">
        Add Staff
      </Button>
      <SearchInput />
    </Card>
  );
}
