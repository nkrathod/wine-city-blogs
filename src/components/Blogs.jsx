import React, { useEffect, useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import SendIcon from "@mui/icons-material/Send";
import { TextField, Avatar, Box, Grid, IconButton } from "@mui/material";
import AuthContext from "../authContext";
import axios from "axios";
import dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");

const Blogs = (props) => {
  const { authenticated, setAuthenticated, userDetails, setUserDeatils } =
    useContext(AuthContext);
  dayjs.extend(relativeTime);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentEff, setCommentEff] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleLikes = () => {
    if (!isLiked) {
      setLikesCount((likes) => likes + 1);
      setIsLiked(true);
    }
  };

  const postComments = () => {
    const commentObj = {
      blogId: props.data.id,
      comment: comment,
      likesCount: 0,
      likedBy: [],
      commentsBy: {
        userid: userDetails.id,
        username: userDetails.username,
        name: userDetails.firstName,
      },
    };
    if (comment !== undefined && comment !== null && comment !== "") {
      axios
        .post(
          `http://localhost:3003/blogsComments?blogId=${props.data.id}`,
          commentObj
        )
        .then((response) => {
          if (response.data) {
            setComment("");
            setCommentEff(response.data.id);
            setIsComment(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (props.data && props.data.likedBy && props.data.likedBy.length > 0) {
      props.data.likedBy.forEach((likes) => {
        if (likes.userid == userDetails.id) {
          setIsLiked(true);
        }
      });
    }
    setLikesCount(props.data.likesCount);
  }, [props.data.likesCount]);

  useEffect(() => {
    axios
      .get(`http://localhost:3003/blogsComments?blogId=${props.data.id}`)
      .then((response) => {
        console.log(response);
        if (response && response.data && response.data.length > 0) {
          setComments(response.data);
          response.data.forEach((comment) => {
            if (comment.commentsBy.userid === userDetails.id) {
              setIsComment(true);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.data, commentEff]);

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
          <div>
            <IconButton size="small" onClick={handleLikes}>
              <ThumbUpIcon color={isLiked ? "primary" : ""} />
            </IconButton>
            <Typography variant="caption" color={isLiked ? "primary" : ""} className="likcount">
              {likesCount}
            </Typography>
          </div>
          <div>
            <IconButton size="small" onClick={handleLikes}>
              <ModeCommentIcon color={isComment ? "primary" : ""} />
            </IconButton>
            <Typography variant="caption" color={isComment ? "primary" : ""} className="commentscount">
              {comments.length}
            </Typography>
          </div>
          <Typography variant="subtitle2" display="block" className="commentscount">
            {dayjs(props.data.timestamp).fromNow()}
          </Typography>
        </CardActions>
        <Box className="commentSection">
          <Grid container spacing={2}>
            <Grid item xs={2} md={1}>
              <Avatar alt={userDetails.firstName} src="/static/images/avatar/1.jpg" />
            </Grid>
            <Grid item xs={8} md={9}>
              <TextField
                fullWidth
                size="small"
                value={comment}
                placeholder="Enter Your Commets"
                onChange={(e) => handleChange(e)}
              ></TextField>
            </Grid>
            <Grid item xs={2} md={2}>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={postComments}
              >
                Send
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {comments.length > 0 && (
              <Grid
                item
                xs={12}
                style={{
                  marginTop: "30px",
                  backgroundColor: "#fafcbb",
                  padding: "10px 20px",
                }}
              >
                {comments.length == 0 && (
                  <Typography variant="subtitle1" color="text.secondary">
                    No comments availabe
                  </Typography>
                )}
                {comments.length > 0 &&
                  comments.map((data) => (
                    <Box style={{ padding: "5px" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={2} md={1}>
                          <Avatar
                            alt={data.commentsBy.name}
                            src="/static/images/avatar/1.jpg"
                          />
                        </Grid>
                        <Grid item xs={8} md={10}>
                          <Typography variant="caption" color="text.secondary">
                            {data.commentsBy.username}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                          >
                            {data.comment}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} md={1}>
                          <Button size="small" startIcon={<ThumbUpIcon />}>
                            {data.likesCount}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
              </Grid>
            )}
          </Grid>
        </Box>
      </Card>
    </div>
  );
};

export default Blogs;
