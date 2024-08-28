// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PepeCoin {
    string public name = "PepeCoin";
    string public symbol = "PEPE";
    uint256 public totalSupply = 1000000 * 10**18; // Total supply in wei (18 decimals)
    uint8 public decimals = 18;
    uint256 public exchangeRate = 10000; // 1 ETH = 10000 PEPE (1 PEPE = 0.0001 USD)

    mapping(address => uint256) public balances;
    address public owner;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Mint(address indexed _to, uint256 _amount);
    event Exchange(address indexed _from, uint256 _ethAmount, uint256 _pepeAmount);

    constructor() {
        owner = msg.sender;
        balances[owner] = totalSupply; // Assign the total supply to the contract deployer
    }

    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balances[msg.sender] >= _value, "Insufficient balance");
        require(_to != address(0), "Invalid address");

        balances[msg.sender] -= _value;
        balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function mint(address _to, uint256 _amount) public returns (bool) {
        require(msg.sender == owner, "Only the owner can mint");
        require(_amount > 0, "Amount must be greater than zero");
        require(totalSupply + _amount <= 1000000000 * 10**18, "Total supply exceeds limit");

        totalSupply += _amount;
        balances[_to] += _amount;

        emit Mint(_to, _amount);
        emit Transfer(address(0), _to, _amount);
        return true;
    }

    function exchangeEthForPepe() public payable {
        require(msg.value > 0, "Send ETH to exchange");

        uint256 pepeAmount = msg.value * exchangeRate;
        require(balances[owner] >= pepeAmount, "Insufficient PEPE balance in contract");

        balances[owner] -= pepeAmount;
        balances[msg.sender] += pepeAmount;

        emit Exchange(msg.sender, msg.value, pepeAmount);
        emit Transfer(owner, msg.sender, pepeAmount);
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
