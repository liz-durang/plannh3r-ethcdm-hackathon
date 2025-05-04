// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract SimpleStaking {
    IERC20 public stakingToken;
    uint256 public rewardRate; // Porcentaje de recompensa en base 1000 (ej: 50 = 5%)
    uint256 public lockTime;   // Tiempo mínimo de staking en segundos

    string public constant contractTag = "Simple Staking Contract!";

    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Stake) public stakes;

    constructor(address _stakingToken, uint256 _rewardRate, uint256 _lockTime) {
        stakingToken = IERC20(_stakingToken);
        rewardRate = _rewardRate; // ej. 50 = 5%
        lockTime = _lockTime;     // ej. 604800 = 7 días
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Debes stakear un monto > 0");
        require(stakes[msg.sender].amount == 0, "Ya tienes un stake activo");

        require(stakingToken.transferFrom(msg.sender, address(this), amount), "Fallo la transferencia");

        stakes[msg.sender] = Stake({
            amount: amount,
            timestamp: block.timestamp
        });
    }

    function withdraw() external {
        Stake memory userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No tienes stake activo");

        uint256 stakingDuration = block.timestamp - userStake.timestamp;
        uint256 reward = 0;

        if (stakingDuration >= lockTime) {
            reward = (userStake.amount * rewardRate) / 1000;
        }

        delete stakes[msg.sender];

        require(stakingToken.transfer(msg.sender, userStake.amount + reward), "Fallo el retiro");
    }

    function getStakeInfo(address user) external view returns (uint256 amount, uint256 timestamp) {
        Stake memory s = stakes[user];
        return (s.amount, s.timestamp);
    }
}
