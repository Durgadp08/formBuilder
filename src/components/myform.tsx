import { Box, Button, Typography } from "@mui/material";
import { getAllForms } from "../store/localstorage";
import { useNavigate } from "react-router-dom";

export default function MyForms() {
  const forms = getAllForms();
  const navigate = useNavigate();

  return (
    <Box p={3} sx={{width:"500px"}}>
      <Typography variant="h4" mb={2}>
        My Forms
      </Typography>
      {forms.length === 0 ? (
        <Typography>No saved forms</Typography>
      ) : (
        forms.map((form) => (
          <Box
            key={form.id}
            p={2}
            mb={1}
            sx={{ border: "1px solid #ccc", borderRadius: "8px" }}
          >
            <Typography variant="h6">{form.name}</Typography>
            <Typography variant="body2">
              Created: {new Date(form.createdAt).toLocaleString()}
            </Typography>
            <Button
              size="small"
              sx={{ mt: 1 }}
              variant="outlined"
              onClick={() => navigate(`/preview?id=${form.id}`)}
            >
              View
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
}
