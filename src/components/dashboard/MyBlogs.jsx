import React, { useEffect, useState, useContext } from "react";
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
      <div style={{ padding: "20px" }}>My Blogs</div>
      <div>
        {myBlogs.map((blog) => (
          <Blogs key={blog.id} data={blog} />
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
