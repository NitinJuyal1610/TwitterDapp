const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Twitter", function () {
  let Twitter;
  let twitter;
  beforeEach(async function () {
    Twitter = await ethers.getContractFactory("Twitter");
    twitter = await Twitter.deploy();
    await twitter.deployed();
  });

  it("Should Create a Tweet", async function () {
    const tweet = ethers.utils.formatBytes32String("HelloWorld");
    const CreateTx = await twitter.createTweet(tweet);
    // wait until the transaction is mined
    const tweet2 = ethers.utils.formatBytes32String("HelloWorld2");
    const CreateTx2 = await twitter.createTweet(tweet2);
    // wait until the transaction is mined
    await CreateTx.wait();
    await CreateTx2.wait();

    expect((await twitter.retrieve())[0])
      .to.have.property("text")
      .to.equal(tweet);

    expect((await twitter.retrieve())[1])
      .to.have.property("text")
      .to.equal(tweet2);
  });

  it("Should Return a Tweet at an Index", async function () {
    const tweet = ethers.utils.formatBytes32String("HelloWorld");
    const CreateTx = await twitter.createTweet(tweet);
    // wait until the transaction is mined
    const tweet2 = ethers.utils.formatBytes32String("HelloWorld2");
    const CreateTx2 = await twitter.createTweet(tweet2);
    // wait until the transaction is mined
    await CreateTx.wait();
    await CreateTx2.wait();

    expect(await twitter.retrieve()).to.have.lengthOf(2);
  });

  it("Should Update a Tweet", async function () {
    const tweet = ethers.utils.formatBytes32String("HelloWorld");
    const CreateTx = await twitter.createTweet(tweet);
    // wait until the transaction is mined
    await CreateTx.wait();
    expect((await twitter.retrieve())[0])
      .to.have.property("text")
      .to.equal(tweet);

    const updatedTweet = ethers.utils.formatBytes32String("UpdatedTweet");

    const UpdateTx = await twitter.updateTweet(updatedTweet, 0);
    // wait until the transaction is mined
    await UpdateTx.wait();

    expect((await twitter.retrieve())[0])
      .to.have.property("text")
      .to.equal(updatedTweet);
  });

  it("Should Delete a Tweet", async function () {
    const tweet = ethers.utils.formatBytes32String("HelloWorld");
    const CreateTx = await twitter.createTweet(tweet);
    // wait until the transaction is mined
    await CreateTx.wait();
    expect(await twitter.retrieve()).to.have.lengthOf(1);

    const DeleteTx = await twitter.deleteTweet(0);
    // wait until the transaction is mined
    await DeleteTx.wait();

    expect(await twitter.retrieve()).to.have.lengthOf(0);
  });
});
