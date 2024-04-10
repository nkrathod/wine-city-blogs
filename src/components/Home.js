import React, { useEffect, useState } from "react";
import Blogs from "./Blogs";
import axios from "axios";
import { Grid, Button } from "@mui/material";

const Home = () => {
  const [blogsData, setBlogsData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3003/blogs")
      .then((response) => {
        if (response && response.data && response.data.length > 0) {
          console.log(response.data);
          setBlogsData(response.data);
        }
      })
      .catch((error) => {
        console.log("error ==> ", error);
      });
  }, []);
  return (
    <>
      <div className="homepage">
        <Grid container spacing={2} sx={{ p: 4 }}>
          <Grid item xs={9}>
            Nashik temples blogs
          </Grid>
          <Grid item xs={3}>
            <Button
              size="medium"
              color="secondary"
              variant="outlined"
              onClick={() => (window.location = "/create-blogs")}
            >
              Create Blog
            </Button>
          </Grid>
        </Grid>
        {blogsData &&
          blogsData.length > 0 &&
          blogsData.map((blog) => <Blogs key={blog.id} data={blog} />)}
      </div>
    </>
  );
};

export default Home;
