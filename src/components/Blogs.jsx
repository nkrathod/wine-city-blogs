import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { TextField, Avatar, Box, Grid } from "@mui/material";

const Blogs = (props) => {
  console.log("props ", props);
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
          <Grid container spacing={2} style={{ marginBottom: "25px" }}>
            <Grid item xs={1}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                size="small"
                placeholder="Enter Your Commets"
              ></TextField>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            style={{ backgroundColor: "#fafcbb", padding: "5px 15px" }}
          >
            <Grid item xs={11}>
              <Typography variant="body2" color="text.secondary">
                commentSection
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Button size="small" startIcon={<ThumbUpIcon />}>
                {props.data.likesCount}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
};

export default Blogs;
