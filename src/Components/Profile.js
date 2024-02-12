import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import close from "../icons/close.png";
import deleteIcn from "../icons/bin.png";
import updateIcn from "../icons/updated.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [imgLink, setImgLink] = useState("");
  const [caption, setCaption] = useState("");
  const [userName, setUserName] = useState("");
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const loader = useRef();

  const modal = useRef();
  const formData = new FormData();
  useEffect(() => {
    // this api is hit to get userName on page load
    axios
      .get("https://instagram-express-app.vercel.app/api/auth/zuku", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserName(response.data.data.user.name);
      })
      .catch((err) => console.log("Error", err.response.data.message));
  }, []);

  useEffect(() => {
    // this api is hit on page load to get all posts posted by the user
    axios
      .get("https://instagram-express-app.vercel.app/api/post/my-posts", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        loader.current.style.display = "none";
        setPosts(response.data.data);
      })
      .catch((err) => console.log("Error", err.response.data.message));
  }, []);

  async function handleSubmit(e) {
    //on submission of modal , display loader before image is posted
    e.preventDefault();
    modal.current.style.top = "-500px";
    loader.current.style.display = "block";

    formData.append("file", imgLink);

    try {
      const response = await axios.post(
        "https://instagram-express-app.vercel.app/api/post/upload",
        formData
      );
      console.log(token);
      const result = await axios.post(
        "https://instagram-express-app.vercel.app/api/post/create",
        {
          image: response.data.data.file_url,
          text: caption,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(result.data.data);
      setPosts([...posts, result.data.data]);
      setImgLink("");
      setCaption("");
      loader.current.style.display = "none";
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    // delete post and setPosts with all remaining posts except the one having id===deleteId
    try {
      const response = await axios.delete(
        `https://instagram-express-app.vercel.app/api/post/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setPosts(posts.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(id, img, postText) {
    // just navigate to update page with prop having id,imgLink,caption of selected post
    navigate("/update", {
      state: {
        id,
        img,
        postText,
      },
    });
  }

  async function logout() {
    // display loader before logout is done
    loader.current.style.display = "block";
    try {
      const response = await axios.delete(
        "https://instagram-express-app.vercel.app/api/auth/logout",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      loader.current.style.display = "none";
      alert("Logout Successful");
      // delete token from localstorage:
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.log("Error", error.response.data.message);
    }
  }

  return (
    <>
      {/*modal form*/}
      <main className="form-signin" ref={modal}>
        <h1 className="h3">Add new post</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              onChange={(e) => setImgLink(e.target.files[0])}
              type="file"
              className="form-control"
              id="floatingInput"
              placeholder="add file"
              required
            />
          </div>
          <div className="form-floating">
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              type="text"
              maxLength="45"
              className="form-control"
              id="floatingPassword"
              placeholder="add caption"
            />
            <label className="text-muted" htmlFor="floatingPassword">
              Add a caption
            </label>
          </div>

          <button className="w-100 btn btn-lg" type="submit">
            Add
          </button>
        </form>
        <p
          onClick={() => {
            modal.current.style.top = "-500px";
          }}
          className="copyright"
        >
          <img
            className="copyright"
            src={close}
            style={{ width: "30px", height: "30px", cursor: "pointer" }}
          ></img>
        </p>
      </main>

      {userName && (
        <div className="myProfile-h1">
          <h1>Welcome Back {userName}</h1>
        </div>
      )}

      <button
        className="button-8"
        role="button"
        onClick={() => {
          modal.current.style.top = "100px";
        }}
      >
        New Post+
      </button>
      <button id="logout-button" onClick={logout}>
        {" "}
        Logout{" "}
      </button>

      {
        //main div
        <div className="d-flex flex-wrap gap-5 all-posts">
          {posts &&
            posts.map((post) => (
              <div id={post._id} className="card" style={{ width: "18rem" }}>
                <img
                  style={{ height: "250px", width: "18rem" }}
                  src={post.image}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <p className="card-text">
                    Note:<b>{post.text}</b>
                  </p>
                </div>
                <img
                  onClick={() => handleDelete(post._id)}
                  className="delete-btn"
                  src={deleteIcn}
                ></img>
                <img
                  onClick={() => handleUpdate(post._id, post.image, post.text)}
                  className="update-btn"
                  src={updateIcn}
                ></img>
              </div>
            ))}
        </div>
      }
      <section ref={loader} className="sec-loading">
        <div className="one"></div>
      </section>
    </>
  );
};
export default Profile;
