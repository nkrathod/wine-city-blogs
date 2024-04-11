import React, { useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AuthContext from "../../authContext";
import { Divider } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import axios from "axios";

const AddBlogs = () => {
  const date = new Date();
  const { userDetails } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imgUrl: "",
    userid: "",
    username: "",
    name: "",
    timestamp: "",
    likesCount: "",
    commentsCount: "",
    likedBy: [],
    blogsComments: [],
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const timestamp = date.getTime();

    const blogData = {
      title: data.get("title"),
      description: data.get("description"),
      imgUrl: data.get("imgUrl"),
      userid: userDetails.id,
      username: userDetails.username,
      name: userDetails.name,
      likesCount: 0,
      commentsCount: 0,
      timestamp: timestamp,
      likedBy: [],
      blogsComments: [],
    };

    if (formData && formData.title && formData.description && userDetails && userDetails.id) {
      axios
        .post("http://localhost:3003/blogs", blogData)
        .then((res) => {
          console.log("Success : ", res);
          setFormData((prev) => ({
            ...prev,
            title: "",
            description: "",
            imgUrl: "",
            userid: "",
            username: "",
            name: "",
            timestamp: "",
            likesCount: "",
            commentsCount: "",
            likedBy: [],
            blogsComments: [],
          }));
          alert("Blog Created Successfully");
        })
        .catch((error) => {
          console.log("Error : ", error);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="homepage">
      <Paper
        sx={{
          mt: 4,
          p: 4,
          maxWidth: 900,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>Create Blog</Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} md={12}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Blog Title"
                    name="title"
                    value={formData.title}
                    autoComplete="title"
                    autoFocus
                    onChange={(e) => handleChange(e)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Blog Description"
                    name="description"
                    value={formData.description}
                    autoComplete="description"
                    autoFocus
                    onChange={(e) => handleChange(e)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="imgUrl"
                    label="Blogs Image Url"
                    name="imgUrl"
                    value={formData.imgUrl}
                    autoComplete="imgUrl"
                    autoFocus
                    onChange={(e) => handleChange(e)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default AddBlogs;
