import React, { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Blogs from "../Blogs";
import axios from "axios";
import AuthContext from "../../authContext";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const { authenticated, setAuthenticated, userDetails, setUserDeatils } =
    useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3003/blogs")
      .then((response) => {
        if (response && response.data && response.data.length > 0) {
          const blogData = response.data.filter(
            (blog) => blog.username == userDetails.username
          );
          console.log(userDetails, " ===> ", blogData);
          setMyBlogs(blogData);
        }
      })
      .catch((error) => {
        console.log("error ==> ", error);
      });
  }, [userDetails]);

  return (
    <div className="homepage">
      {!authenticated ? (
        <div style={{ padding: "50px", height: "77vh" }}>
          <Typography>
            Please login : click login button to redirect signin page
          </Typography>
          <Button
            size="medium"
            color="primary"
            variant="contained"
            onClick={() => (window.location = "/signin")}
          >
            Back to Login
          </Button>
        </div>
      ) : (
        <div>
          <div style={{ padding: "20px" }}>My Blogs</div>
          <div>
            {myBlogs.map((blog) => (
              <Blogs key={blog.id} data={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
