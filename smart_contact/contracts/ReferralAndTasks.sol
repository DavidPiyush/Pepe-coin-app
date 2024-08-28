// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReferralAndTasks {

    struct User {
        address walletAddress;
        uint256 rewardBalance;
        uint256 lastTaskCompletionTime;
    }

    mapping(address => User) public users;
    mapping(address => address) public referrals;

    uint256 public referralReward = 100; // Example reward amount for referrals
    uint256 public taskReward = 50; // Example reward amount for daily tasks
    uint256 public taskCooldown = 1 days;

    function registerUser(address referrer) public {
        require(users[msg.sender].walletAddress == address(0), "User already registered");
        users[msg.sender] = User(msg.sender, 0, 0);

        if (referrer != address(0) && users[referrer].walletAddress != address(0)) {
            referrals[msg.sender] = referrer;
            users[referrer].rewardBalance += referralReward;
        }
    }

    function completeTask() public {
        require(users[msg.sender].walletAddress != address(0), "User not registered");
        require(block.timestamp >= users[msg.sender].lastTaskCompletionTime + taskCooldown, "Task already completed today");

        users[msg.sender].rewardBalance += taskReward;
        users[msg.sender].lastTaskCompletionTime = block.timestamp;
    }

    function withdrawRewards() public {
        require(users[msg.sender].rewardBalance > 0, "No rewards to withdraw");
        uint256 amount = users[msg.sender].rewardBalance;
        users[msg.sender].rewardBalance = 0;

        payable(msg.sender).transfer(amount);
    }

    // Fallback function to accept ETH deposits
    receive() external payable {}
}
