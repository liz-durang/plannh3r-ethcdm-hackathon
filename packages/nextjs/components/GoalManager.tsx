"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const GoalManager = () => {
  const { address } = useAccount();
  const [description, setDescription] = useState("");
  const [activityType, setActivityType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [durationDays, setDurationDays] = useState(1);
  const [goalIdToComplete, setGoalIdToComplete] = useState("");
  const [goalIdToClaim, setGoalIdToClaim] = useState("");

  const { writeContractAsync: writeGoal } = useScaffoldWriteContract("PlannH3rStaking");

  const handleCreateGoal = async () => {
    const timestamp = Math.floor(new Date(startDate).getTime() / 1000);
    await writeGoal({
      functionName: "createGoal",
      args: [description, activityType, BigInt(timestamp), BigInt(durationDays)],
      value: BigInt(0.01 * 1e18), // 0.01 ETH como stake mínimo
    });
  };

  const handleCompleteGoal = async () => {
    await writeGoal({
      functionName: "completeGoal",
      args: [BigInt(goalIdToComplete), BigInt(10)],
    });
  };

  const handleClaimGoal = async () => {
    await writeGoal({
      functionName: "claimGoal",
      args: [BigInt(goalIdToClaim)],
    });
  };

  return (
    <div className="p-4 space-y-4 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-xl font-bold">🎯 Crear nueva meta</h2>
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="text"
        placeholder="Tipo de actividad (física, mental, etc.)"
        value={activityType}
        onChange={e => setActivityType(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
        className="input input-bordered w-full"
      />
      <input
        type="number"
        placeholder="Duración en días"
        value={durationDays}
        onChange={e => setDurationDays(Number(e.target.value))}
        className="input input-bordered w-full"
      />
      <button className="btn btn-primary w-full" onClick={handleCreateGoal}>
        Crear Meta
      </button>

      <hr className="my-4" />

      <h2 className="text-xl font-bold">✅ Completar meta</h2>
      <input
        type="number"
        placeholder="ID de la meta"
        value={goalIdToComplete}
        onChange={e => setGoalIdToComplete(e.target.value)}
        className="input input-bordered w-full"
      />
      <button className="btn btn-success w-full" onClick={handleCompleteGoal}>
        Completar Meta
      </button>

      <h2 className="text-xl font-bold mt-6">💰 Reclamar stake</h2>
      <input
        type="number"
        placeholder="ID de la meta"
        value={goalIdToClaim}
        onChange={e => setGoalIdToClaim(e.target.value)}
        className="input input-bordered w-full"
      />
      <button className="btn btn-warning w-full" onClick={handleClaimGoal}>
        Reclamar Stake
      </button>
    </div>
  );
};
