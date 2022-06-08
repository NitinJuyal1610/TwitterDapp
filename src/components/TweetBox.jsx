import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { ethers, BigNumber } from "ethers";
import imgg from "./delete.png";
const TweetBox = ({ text, ind, deleteTweet, updateTweet }) => {
  const [Tweet, setTweet] = useState(ethers.utils.parseBytes32String(text));
  const textRef = useRef();
  return (
    <div
      style={{
        fontSize: "1.5rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {Tweet}
      <div
        style={{
          fontSize: "0.2rem",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <button
          className="delete"
          onClick={(e) => {
            e.preventDefault();
            deleteTweet(BigNumber.from([ind]));
          }}
        >
          <img style={{ width: "20px" }} src={imgg} alt="delete" />
        </button>
        <button
          className="update"
          onClick={(e) => {
            e.preventDefault();
            setTweet(
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <textarea
                  style={{
                    borderRadius: "12px",
                    border: "none",
                    paddingLeft: "5px",
                    paddingTop: "5px",
                  }}
                  ref={textRef}
                  defaultValue={Tweet}
                ></textarea>
                <button
                  className="save"
                  onClick={(e) => {
                    updateTweet(textRef.current.value, ind);
                  }}
                >
                  Save
                </button>
              </div>
            );
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};
export default TweetBox;
