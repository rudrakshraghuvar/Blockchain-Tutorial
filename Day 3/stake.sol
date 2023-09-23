//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/** 
@title Staking Contract
@author Rudra Pratap Singh
@notice User stake their tokens and get some rewards
@dev To run this staking contract first the owner have to mint or transfer some tokens to this contract
*/

contract Staking {
    IERC20 private token;

    /**
    Pass the address of the erc20 contract at the deployment of this staking contract
    */

    constructor(address _token) {
        token = IERC20(_token);
    }

    /**
    This struct datatype stores information about particular stake id
    */

    struct stake {
        address holder;
        uint256 amount;
        uint256 plan;
        uint256 stakedAt;
    }

    /**
    We can fetch/store the deatils of stakeholders by using this array
    */

    stake[] internal stakeholders;

    /**
    This mapping stores the info about how many ids an address can store
    */

    mapping(address => uint256[]) internal stakedIdsByAddress;

    /**
    This mapping help us to calculate the time to claim amount only after 2 minutes
    */
    
    mapping(uint256 => uint256) internal _timestamp;

    event Staked(
        address indexed holder,
        uint256 amount,
        uint256 stakeholderId,
        uint256 plan,
        uint256 stakedAt
    );

    /**
    From this function we get the ids an address is staked
    */

    function getIdsByAddress(
        address account
    ) public view returns (uint256[] memory) {
        return stakedIdsByAddress[account];
    }

    /**
    For staking {condition}
    1 --- you have enough token in your account
    2 --- you have to approve this contract an amount how much you want to stake
    3 --- you stake amount 1 or greater value
    4 --- choose a specific plan i.e., 2,4,6,8,10 minutes
    */

    function Stake(uint256 amount, uint256 tariff) public {
        require(amount > 0, "Amount must be greater then zero");
        require(token.balanceOf(msg.sender) >= amount, "Insufficient Token");
        require(
            tariff == 2 ||
                tariff == 4 ||
                tariff == 6 ||
                tariff == 8 ||
                tariff == 10,
            "Please Enter Valid Tariff Plan"
        );
        uint256 stakedAt = block.timestamp;
        token.transferFrom(msg.sender, address(this), amount);
        stakeholders.push(stake(msg.sender, amount, tariff, stakedAt));
        uint256 id = stakeholders.length;
        stakedIdsByAddress[msg.sender].push(id);
        emit Staked(msg.sender, amount, id, tariff, stakedAt);
    }

    /**
    Function to calculate the minimum of two values
    */

    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    /**
    This function calculate the reward based on your choosen plan
    */

    function _calculateReward(uint256 id) internal view returns (uint256) {
        stake memory _stake = stakeholders[id - 1];
        uint256 _time = block.timestamp - _stake.stakedAt;
        uint256 _plan = _stake.plan;
        uint256 res;

        if (_plan == 2) {
            res = (((min(_time, _plan * 60) * _stake.amount) * 1) / 100);
        } else if (_plan == 4) {
            res = (((min(_time, _plan * 60) * _stake.amount) * 2) / 100);
        } else if (_plan == 6) {
            res = (((min(_time, _plan * 60) * _stake.amount) * 3) / 100);
        } else if (_plan == 8) {
            res = (((min(_time, _plan * 60) * _stake.amount) * 4) / 100);
        } else {
            res = (((min(_time, _plan * 60) * _stake.amount) * 5) / 100);
        }

        return res;
    }

    /** 
    By this function user check how much reward he/she can get at the present time 
    */

    function generateReward(
        uint256 id
    ) public view returns (uint256 reward, uint256 time) {
        require(stakeholders.length >= id, "Invalid ID");
        stake memory _stake = stakeholders[id - 1];
        // require(_stake.holder != address(0), "Already Claimed, ID is Invalid");
        uint256 _time = block.timestamp - _stake.stakedAt;
        uint256 _plan = _stake.plan;
        return (_calculateReward(id), min(_time, _plan*60));
    }

    /** 
    This is read only function by this any user can check all details about a specific id
    */

    function getInfoByID(
        uint256 id
    ) public view returns (address stakeHolder, uint256 amount, uint256 plan) {
        require(stakeholders.length >= id, "Invalid ID");
        stake memory _stake = stakeholders[id - 1];
        // require(_stake.holder != address(0), "ID does not exists");
        address _user = _stake.holder;
        uint256 _amount = _stake.amount;
        uint256 _plan = _stake.plan;
        return (_user, _amount, _plan);
    }

    /** 
    By this function user can claim their reward {conditions}
    1 --- only the owner of the id can claim the reward
    2 --- user can claim reward only after the maturity period is over
    3 --- user can claim reward only one time after claiming reward this id is expired
    Note --- Your reward amount exceed only in the time of the maturity period after maturity period your reward does not exceed
    so this is recommended that you do not hold your amount and reward after your maturity period is over... Thanks!!!
    */

    function claimRewards(uint256 id) public {
        require(stakeholders.length >= id, "Invalid ID");
        stake memory _stake = stakeholders[id - 1];
        require(_stake.holder != address(0), "Already Claimed, ID is Invalid");
        require(msg.sender == _stake.holder, "Caller is not the Owner");
        uint256 time = block.timestamp - _stake.stakedAt;
        require(time >= _stake.plan * 60, "Maturity Period is Not Expired");
        uint256 reward = _calculateReward(id);
        require(
            token.balanceOf(address(this)) >= reward,
            "Error: Insufficient Balance in Contract, Contact to Admin"
        );
        _timestamp[id] = block.timestamp;
        token.transfer(_stake.holder, reward);
        stakeholders[id - 1].plan = 0;
        stakeholders[id - 1].stakedAt = 0;
    }

    /** 
    This function is used to claim amount {conditions}
    1 --- only the owner of the id can claim the amount
    2 --- user can claim amount after 2 minutes from the time of claim reward
    3 --- user can claim amount only one time after claiming amount this id is expired
    4 --- you does not claim amount before claiming the reward
    Note --- It is recommended to do not hold amount aftert 2 minutes of climaimg reward. No increament is happen in amount.
    */

    function claimAmount(uint256 id) public {
        require(stakeholders.length >= id, "Invalid ID");
        stake memory _stake = stakeholders[id - 1];
        require(_stake.holder != address(0), "Amount Claimed, ID is Invalid");
        require(msg.sender == _stake.holder, "Caller is not the Owner");
        require(stakeholders[id - 1].plan == 0, "Reward is not Claimed");
        require(
            block.timestamp - _timestamp[id] >= 120,
            "Can Claim After Probabtion Time"
        );
        uint256 amount = _stake.amount;
        require(
            token.balanceOf(address(this)) >= amount,
            "Error: Insufficient Balance in Contract, Contact to Admin"
        );
        token.transfer(_stake.holder, amount);
        stakeholders[id - 1].holder = address(0);
        stakeholders[id - 1].amount = 0;
        _timestamp[id] = 0;
    }

    function isClaimAmountAvailable(uint256 id) public view returns (bool) {
        require(stakeholders.length >= id, "Invalid ID");
        return (_timestamp[id] != 0 && block.timestamp - _timestamp[id] >= 120);
    }

}