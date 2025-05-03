"use client";

import dynamic from "next/dynamic";
import { GoalManager } from "../../components/GoalManager";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon } from "@heroicons/react/24/outline";

// Importa el componente de forma dinámica (evita errores con SSR)

const GoalManagerPage: NextPage = () => {
  const { address: userAddress } = useAccount();

  return (
    <div className="flex flex-col items-center p-6">
      <GoalManager />
    </div>
  );
};

export default GoalManagerPage;
