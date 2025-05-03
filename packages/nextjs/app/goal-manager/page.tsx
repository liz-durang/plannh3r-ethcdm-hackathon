"use client";

import dynamic from "next/dynamic";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon } from "@heroicons/react/24/outline";

// Importa el componente de forma dinámica (evita errores con SSR)
const GoalManager = dynamic(() => import("~~/components/GoalManager"), { ssr: false });

const GoalManagerPage: NextPage = () => {
  const { address: userAddress } = useAccount();

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5 w-full max-w-xl">
        <h1 className="text-center">
          <span className="block text-2xl mb-2">Gestor de Metas</span>
          <span className="block text-4xl font-bold">PlannH3r Staking</span>
        </h1>
        <div className="flex justify-center items-center space-x-2 flex-col mb-6">
          <BugAntIcon className="h-8 w-8 fill-secondary" />
          <p className="my-2 font-medium">Administra y reclama tus metas.</p>
        </div>

        {userAddress ? (
          <GoalManager userAddress={userAddress} />
        ) : (
          <p className="text-center text-red-500">Conecta tu wallet para comenzar.</p>
        )}
      </div>
    </div>
  );
};

export default GoalManagerPage;
