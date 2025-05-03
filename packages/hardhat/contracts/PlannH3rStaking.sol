// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract PlannH3rStaking {

    struct Goal {
        address user;
        string description;
        string activityType; // física, mental, educativa, etc.
        uint256 stakeAmount;
        uint256 startDate;
        uint256 endDate;
        bool isCompleted;
        bool isClaimed;
    }

    uint256 public goalCount;
    mapping(uint256 => Goal) public goals;
    mapping(address => uint256[]) public userGoals;
    mapping(address => uint256) public userPoints;
    mapping(address => uint256) public userStakeBalance;

    uint256 public communityPool;

    event GoalCreated(uint256 goalId, address user, uint256 stakeAmount, uint256 startDate, uint256 endDate);
    event GoalCompleted(uint256 goalId);
    event StakeHandled(uint256 goalId, address user, bool success, uint256 pointsEarned);

    function createGoal(
        string calldata _description,
        string calldata _activityType,
        uint256 _startDate,
        uint256 _durationDays
    ) external payable {
        require(msg.value > 0, "Debes depositar un stake");
        require(_startDate >= block.timestamp, "Fecha de inicio invalida");

        goalCount++;
        uint256 endDate = _startDate + (_durationDays * 1 days);

        goals[goalCount] = Goal({
            user: msg.sender,
            description: _description,
            activityType: _activityType,
            stakeAmount: msg.value,
            startDate: _startDate,
            endDate: endDate,
            isCompleted: false,
            isClaimed: false
        });

        userGoals[msg.sender].push(goalCount);
        userStakeBalance[msg.sender] += msg.value;

        emit GoalCreated(goalCount, msg.sender, msg.value, _startDate, endDate);
    }

    function completeGoal(uint256 _goalId, uint256 _points) external {
        Goal storage goal = goals[_goalId];
        require(msg.sender == goal.user, "No puedes modificar esta meta");
        require(block.timestamp >= goal.startDate, "Aun no empieza");
        require(block.timestamp <= goal.endDate, "Meta expirada");
        require(!goal.isCompleted, "Ya fue completada");

        goal.isCompleted = true;
        userPoints[msg.sender] += _points; // puntos por completar actividad

        emit GoalCompleted(_goalId);
        emit StakeHandled(_goalId, msg.sender, true, 10);
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
        payable(msg.sender).transfer(amount);
    }

    function getUserGoals(address _user) external view returns (uint256[] memory) {
        return userGoals[_user];
    }

    function donateToPool() external payable {
        communityPool += msg.value;
    }

    function getPoints(address _user) external view returns (uint256) {
        return userPoints[_user];
    }
}
