import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployPlannH3rStaking: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, get } = hre.deployments;

  const deployment = await deploy("PlannH3rStaking", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  console.log("✅ PlannH3rStaking deployed at:", deployment.address);
};

export default deployPlannH3rStaking;

deployPlannH3rStaking.tags = ["PlannH3rStaking"];
