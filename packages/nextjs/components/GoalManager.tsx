// packages/nextjs/components/GoalManager.tsx
import React from "react";

type GoalManagerProps = {
  userAddress?: string;
};

const GoalManager: React.FC<GoalManagerProps> = ({ userAddress }) => {
  return (
    <div>
      <h2>Bienvenida, {userAddress}</h2>
      {/* Lógica de gestión de metas aquí */}
    </div>
  );
};

export default GoalManager;
