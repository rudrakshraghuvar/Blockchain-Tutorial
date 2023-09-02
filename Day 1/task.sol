// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Manager {

    uint256 public ForStudentRegistrationID;
    uint256 public ForSponsorRegistrationID;
    mapping (address => bool) private sponsers;
    mapping (address => bool) private students;

    constructor() {
        ForSponsorRegistrationID = 1;
        ForStudentRegistrationID = 2;
    }
    
    function registration(uint256 id) public returns(bool) {
        require(id == 1 || id == 2, "This id does not exist please check");
        require(sponsers[msg.sender] != true, "You are already registered as a Sponser");
        require(students[msg.sender] != true, "You are already registered as a Student");

        if(id == 1)
            sponsers[msg.sender] = true;
        else
            students[msg.sender] = true;

        return true;
    }

    function isUserRegistered(address user) public view returns(bool) {
        return sponsers[user] || students[user];
    }

    function userType(address user) public view returns(string memory) {
        require(sponsers[user] == true || students[user] == true, "This address is not registered");

        if(sponsers[user] == true)
            return "Sponser";
        return "Student";
    }

}