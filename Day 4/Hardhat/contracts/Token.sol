// SPDX-License-Identifier: MIT
// @rudrakshh
pragma solidity >=0.5.8 <0.9.8;

contract Token{
    string public name="HardHat Token";
    string public symbol = "HHT";
    uint public totalSupply = 10000;

    address public owner;

    mapping(address=>uint) balances;

    constructor(){
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external{
        require (balances[msg.sender]>=amount,"Insufficient tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns(uint256){
        return balances[account];
    }
}