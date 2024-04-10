import React, { useEffect, useState } from "react";
import Blogs from "./Blogs";
import axios from "axios";

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
        <div style={{ padding: "20px" }}>Nashik temples blogs</div>
        {blogsData && blogsData.length > 0 && blogsData.map((blog) => <Blogs key={blog.id} data={blog}/>)}
      </div>
    </>
  );
};

export default Home;
