import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import FormButtonsSideBar from "./createFormButtons";
import FormViewer from "./formViewer";

const Create = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          size={3}
          sx={{
            p: 2,
            borderRadius: "20px",
            height: "82vh",
            overflowY: "scroll",
          }}
        >
          <FormButtonsSideBar />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid
          size={6}
          sx={{
            borderRadius: "20px",
            overflowY: "scroll",
          }}
        >
          <Box display="flex" justifyContent="space-between" sx={{ p: 2 }}>
            <Typography>Form</Typography>
            <Box display="flex" alignContent="space-between">
              <Button>Cancel</Button>
              <Button>Save</Button>
              <Button>Preview</Button>
            </Box>
          </Box>
          <FormViewer />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid size={3}></Grid>
      </Grid>
    </>
  );
};

export default Create;
