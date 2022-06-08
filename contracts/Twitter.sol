// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev CRUD using Solidity
 */

contract Twitter{

    struct Tweet{
        address user;
        bytes32 text;
    }

    Tweet[] TweetList;

    modifier onlyUser(uint _ind){
        require(TweetList[_ind].user==msg.sender,"You are not the owner");
        _;
    }

    function createTweet(bytes32 _text) external{
        TweetList.push(Tweet(msg.sender,_text));
    }

    function retrieve() view external returns (Tweet[] memory){
        return TweetList;
    }

    function updateTweet(bytes32 _newText,uint _ind) onlyUser(_ind) external{
        TweetList[_ind]=Tweet(msg.sender,_newText);
    }

    function deleteTweet(uint _ind) onlyUser(_ind) external {   
        for(uint i=_ind;i<TweetList.length-1;i++){
            TweetList[i]=TweetList[i+1];
        }
        TweetList.pop();
    }
}