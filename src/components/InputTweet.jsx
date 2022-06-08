import React from "react";
import { useState } from "react";

const InputTweet = ({ createTweet }) => {
  const [tweet, setTweet] = useState("");
  return (
    <div style={{ display: "flex" }}>
      <input
        style={{
          backgroundColor: "white",
          width: "80vh",
          border: "none ",
          borderRadius: "12px",
          height: "2.5rem",
          fontSize: "1rem",
        }}
        type="text"
        value={tweet}
        placeholder="tweet here..."
        onChange={(e) => setTweet(e.target.value)}
        required
      />
      <button
        className="post"
        onClick={(e) => {
          e.preventDefault();
          createTweet(tweet);
          setTweet("");
        }}
      >
        Post
      </button>
    </div>
  );
};

export default InputTweet;
