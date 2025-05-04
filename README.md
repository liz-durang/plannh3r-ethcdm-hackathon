# PlannH3R

**Organize your life, sync it with your cycle, and reward your effort**  
[Hackathon ETHCDM](https://taikai.network/en/ethcdm/hackathons/ethcdm-2/overview)

![PlannH3R Image](https://github.com/liz-durang/plannh3r-ethcdm-hackathon/blob/main/packages/nextjs/public/PlannH3r%20-%20banner-english.jpg)  

---

# About The Project

PlannH3R: the app that syncs your productivity with your menstrual cycle. Plan your activities efficiently according to your cycle phases, stay motivated with rewards, and discover how the connection between body and mind optimizes performance.

---

# Problem

**Lack of awareness about how the menstrual cycle affects productivity**  
Women experience fluctuations in energy and productivity throughout the cycle, but there’s often little awareness of how these changes impact daily performance.

- **Disconnection between well-being and goals**  
Current linear tools, combined with the lack of integration between personal planning and the menstrual cycle, make it difficult to align goals with physical and emotional needs.

- **Lack of motivation**  
There are no solutions that encourage task completion, promote discipline, reward achievements, and are aligned with menstrual cycle phases to drive results.

---

# Solution

PlannH3R syncs productivity with the phases of the menstrual cycle through a personalized calendar that adapts and suggests tasks and projects for each phase. It promotes efficient planning and motivation through rewards and access to wellness products and services upon achieving goals, while helping users understand how the body-mind connection boosts productivity.

---

# 🚀 Main Features

- 📆 **Smart Planning**: Automatic scheduling and rescheduling of activities, task creation by project, and personalized suggestions based on your needs.
- 🎯 **Rewards**: Staking deposit for each activity, locked if incomplete and released at the end of the cycle if completed. Accumulated rewards can be redeemed for products, saved, donated, or directed to research, with extra rewards for participation.
- 🪙 **Chatbot**: Suggestions based on your history and support for daily planning.
- 📲 **Integrations and Dashboard**: Sync with smartwatches and apps for real-time metrics and comprehensive tracking. Detailed analysis of your cycle and goal progress. Real-time dashboards to monitor daily task completion.

---

# 🛠️ Tech Stack

- **Frontend:** React.js + TailwindCSS  
- **Backend:** Node.js + Express  
- **Blockchain:** Solenium + MXNB + Hyperlane

---

### Solenium

Layer 2 where the app is deployed, with rewards delivered in $ASTR. It offers fast, accessible, and sustainable transactions, ideal for a mass-market wellness app.

- [Wallet Transactions](https://soneium-minato.blockscout.com/address/0x5d4f7Fe457A8B23c2449a585EC980E35275fa469?tab=txs)  
- [Some Contracts Deployed 1](https://soneium-minato.blockscout.com/tx/0x97b5369bab8ad1fb3f2bd65e695093ac72b52a7ce92ccf725bc50674323b191b)  
- [Some Contracts Deployed 2](https://soneium-minato.blockscout.com/tx/0x6b7d6737aaa335b188af6642aa4ede7bf6f5942525dfc225a5b07cb4d1e769c2)  

![Use of SCS](https://github.com/liz-durang/plannh3r-ethcdm-hackathon/blob/main/packages/nextjs/public/RPC-solenium-dashboard.png) 

---

### MXNB

Integrated stablecoin for staking within the app, providing financial stability and accessibility. It allows for rewarding without exposure to volatility.

- [Contracts Deployed in Soneium integrating MXNB in Arbitrum Sepolia through Hyperlane](https://soneium-minato.blockscout.com/tx/0x97b5369bab8ad1fb3f2bd65e695093ac72b52a7ce92ccf725bc50674323b191b)

---

### Hyperlane

Enables interoperability between Solenium and Arbitrum, allowing the integration of MXNB and other currencies for users to stake. This facilitates future expansion toward more assets and Web3 features.

- [MXNB synthetic deployed in Soneium with Hyperlane Warp](https://soneium-minato.blockscout.com/tx/0x55d6cb4939a3117f1b37e713ad7544b87ba257d1b6fa971dee6e5613164a5a97)

---

# 👩‍💻 Team

**Liz Durán** ([@liz_durang](https://x.com/liz_durang)): Project Manager & Blockchain Developer  
**OlaOlaPaola** ([@OlaOlaPaola_](https://x.com/OlaOlaPaola_)): Product Manager, UI/UX Designer & Frontend Developer

---

# 🎥 Demo

[Link to demo video or screenshots (coming soon)]

---

# 🧠 Roadmap

[Product Brainstorming](https://excalidraw.com/#room=cb5c7afbcfec9a71b3d1,K8rQ551ONr-fUOwsnV_ZJw)

---

# 📌 Quickstart

```bash
git clone https://github.com/liz-durang/plannh3r-ethcdm-hackathon.git
cd plannh3r
yarn install

# Start the local development node
yarn chain

# In a new terminal window, deploy your contracts
yarn deploy

# In a new terminal window, deploy your contracts in Soneium Minato
yarn deploy --minato

# In a new terminal window, start the frontend
yarn start
