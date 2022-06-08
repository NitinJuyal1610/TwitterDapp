import "./App.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import TwitterDappAbi from "./TwitterDappAbi.json";
import InputTweet from "./components/InputTweet";
import TweetBox from "./components/TweetBox";

const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  //Connecting
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState("");
  const [tweets, setTweets] = useState([]);

  async function connectAccounts() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  async function getContract() {
    if (window.ethereum) {
      const url = "http://127.0.0.1:8545/";
      const provider = new ethers.providers.JsonRpcProvider(url);
      const signer = provider.getSigner();
      const data = new ethers.Contract(address, TwitterDappAbi.abi, signer);
      setContract(data);
    }
  }

  async function createTweet(text) {
    const t = ethers.utils.formatBytes32String(text);
    await contract.createTweet(t).then((res) => {
      contract.retrieve().then((res) => {
        setTweets(res);
        console.log(res, "ok");
      });
      console.log(res, "ok");
    });
  }

  async function deleteTweet(ind) {
    await contract.deleteTweet(ind).then((res) => {
      contract.retrieve().then((res) => {
        setTweets(res);
        console.log(res, "ok");
      });
    });
  }

  async function updateTweet(text, i) {
    const t = ethers.utils.formatBytes32String(text);
    await contract.updateTweet(t, i).then((res) => {
      contract.retrieve().then((res) => {
        setTweets(res);
        window.location.reload(false);
        console.log(res, "ok");
      });
    });
  }

  useEffect(() => {
    connectAccounts();
    getContract();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      await contract.retrieve().then((res) => {
        setTweets(res);
        console.log(res, "ok");
      });
    };
    contract && fetch();
    console.log(contract);
  }, [contract]);

  return (
    <div className="App">
      <h1>TwitterDapp </h1>
      <InputTweet createTweet={createTweet} />
      <div
        style={{
          backgroundColor: " #0960bd",
          width: "85vh",
          marginLeft: "-65px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          borderRadius: "12px",
          padding: "12px 12px",
        }}
      >
        {tweets.map((e, i) => (
          <TweetBox
            text={e.text}
            ind={i}
            deleteTweet={deleteTweet}
            updateTweet={updateTweet}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
