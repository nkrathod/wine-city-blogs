import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { TextField, Avatar, Box, Grid } from "@mui/material";
import axios from "axios";

const Blogs = (props) => {
  console.log("props ", props);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3003/blogs/${props.data.id}`)
      .then((response) => {
        console.log(
          props.data.id,
          " blogsComments => ",
          response.data.blogsComments
        );
        if (
          response &&
          response.data &&
          response.data &&
          response.data.blogsComments.length > 0
        ) {
          setComments(response.data.blogsComments);
        }
      })
      .catch((error) => {
        console.log("error ==> ", error);
      });
  }, [props.data]);

  return (
    <div style={{ marginBottom: "50px" }}>
      <Card sx={{ maxWidth: 900 }}>
        <CardMedia
          sx={{ height: 300 }}
          image={props.data && props.data.imgUrl}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.data.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" startIcon={<ThumbUpIcon />}>
            {props.data.likesCount}
          </Button>
          <Button size="small" startIcon={<ModeCommentIcon />}>
            {props.data.commentsCount}
          </Button>
        </CardActions>
        <Box className="commentSection">
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Avatar alt={props.data.name} src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter Your Commets"
              ></TextField>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              style={{
                marginTop: "30px",
                backgroundColor: "#fafcbb",
                padding: "10px 20px",
              }}
            >
              {" "}
              {comments.length > 0 &&
                comments.map((data) => (
                  <Box style={{ padding: "5px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={1}>
                        <Avatar
                          alt={data.commentsBy.name}
                          src="/static/images/avatar/1.jpg"
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant="body2" color="text.secondary">
                          {data.commentsBy.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {data.comment}
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Button size="small" startIcon={<ThumbUpIcon />}>
                          {data.likesCount}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
};

export default Blogs;
