// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PlannH3r {
    IERC20 public immutable stakingToken; // MXNB
    IERC20 public immutable rewardToken;  // ASTR (para recompensas, si aplica)

    struct Goal {
        address user;
        string description;
        string activityType;
        uint256 stakeAmount;
        uint256 startDate;
        uint256 endDate;
        bool isCompleted;
        bool isClaimed;
    }

    string public constant contractTag = "PlannH3r Contract!";

    uint256 public goalCount;
    mapping(uint256 => Goal) public goals;
    mapping(address => uint256[]) public userGoals;
    mapping(address => uint256) public userPoints;
    mapping(address => uint256) public userStakeBalance;

    uint256 public communityPool;

    event GoalCreated(uint256 goalId, address user, uint256 stakeAmount, uint256 startDate, uint256 endDate);
    event GoalCompleted(uint256 goalId);
    event StakeHandled(uint256 goalId, address user, bool success, uint256 pointsEarned);

    constructor(address _mxnbToken, address _astrToken) {
        stakingToken = IERC20(_mxnbToken);
        rewardToken = IERC20(_astrToken);
    }

    function createGoal(
        string calldata _description,
        string calldata _activityType,
        uint256 _startDate,
        uint256 _durationDays,
        uint256 _stakeAmount
    ) external {
        require(_stakeAmount > 0, "Debes depositar un stake");
        require(_startDate >= block.timestamp, "Fecha de inicio invalida");
        require(stakingToken.transferFrom(msg.sender, address(this), _stakeAmount), "Transfer failed");

        goalCount++;
        uint256 endDate = _startDate + (_durationDays * 1 days);

        goals[goalCount] = Goal({
            user: msg.sender,
            description: _description,
            activityType: _activityType,
            stakeAmount: _stakeAmount,
            startDate: _startDate,
            endDate: endDate,
            isCompleted: false,
            isClaimed: false
        });

        userGoals[msg.sender].push(goalCount);
        userStakeBalance[msg.sender] += _stakeAmount;

        emit GoalCreated(goalCount, msg.sender, _stakeAmount, _startDate, endDate);
    }

    function completeGoal(uint256 _goalId, uint256 _points) external {
        Goal storage goal = goals[_goalId];
        require(msg.sender == goal.user, "No puedes modificar esta meta");
        require(block.timestamp >= goal.startDate, "Aun no empieza");
        require(block.timestamp <= goal.endDate, "Meta expirada");
        require(!goal.isCompleted, "Ya fue completada");

        goal.isCompleted = true;
        userPoints[msg.sender] += _points;

        emit GoalCompleted(_goalId);
        emit StakeHandled(_goalId, msg.sender, true, _points);
    }

    function claimGoal(uint256 _goalId) external {
        Goal storage goal = goals[_goalId];
        require(msg.sender == goal.user, "No es tu meta");
        require(block.timestamp > goal.endDate, "Aun no termina");
        require(!goal.isClaimed, "Ya reclamada");

        goal.isClaimed = true;

        if (!goal.isCompleted) {
            uint256 penalty = goal.stakeAmount / 2;
            communityPool += penalty;
            userStakeBalance[msg.sender] -= penalty;
            emit StakeHandled(_goalId, msg.sender, false, 0);
        }
    }

    function withdrawStake(uint256 amount) external {
        require(userStakeBalance[msg.sender] >= amount, "Saldo insuficiente");
        userStakeBalance[msg.sender] -= amount;
        require(stakingToken.transfer(msg.sender, amount), "Transfer failed");
    }

    function getUserGoals(address _user) external view returns (uint256[] memory) {
        return userGoals[_user];
    }

    function donateToPool(uint256 amount) external {
        require(stakingToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        communityPool += amount;
    }

    function getPoints(address _user) external view returns (uint256) {
        return userPoints[_user];
    }

    // (Opcional) función para premiar con ASTR al completar metas, si deseas distribuir tokens
    function claimReward(uint256 amount) external {
        // Aquí podrías usar una lógica de validación con puntos
        require(rewardToken.transfer(msg.sender, amount), "Reward transfer failed");
    }
}
