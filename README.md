# PlannH3R

**Organiza tu vida, sincronízala con tu ciclo y recompensa tu esfuerzo**

![Imagen de PlannH3R](https://github.com/liz-durang/LearningPass/blob/main/packages/nextjs/public/LearningPass.jpg)  
[Hackathon ETHCDM](https://taikai.network/en/ethcdm/hackathons/ethcdm-2/overview) 

---

# About The Project

PlannH3R: la app que sincroniza tu productividad con tu ciclo menstrual. Planifica tus actividades de manera eficiente según las fases de tu ciclo, mantén la motivación con recompensas y descubre cómo la conexión entre cuerpo y mente optimiza tu rendimiento.

---

# Problem 

**Desconocimiento sobre cómo el ciclo menstrual afecta la productividad**  
Las mujeres experimentan fluctuaciones en su energía y productividad a lo largo del ciclo, pero a menudo no hay conciencia de cómo estos cambios afectan su rendimiento diario.

- **Desconexión entre bienestar y metas**  
Las herramientas lineales actuales, sumadas a la falta de integración entre la planificación personal y el ciclo menstrual, dificultan la alineación de los objetivos con las necesidades físicas y emocionales.

- **Falta de motivación**  
No existen soluciones que incentiven el cumplimiento de actividades, fomenten la disciplina, recompensen los logros y estén alineadas con las fases del ciclo menstrual para lograr resultados.

---

# Solution 

PlannH3R sincroniza la productividad con las fases del ciclo menstrual mediante un calendario personalizado que adapta y sugiere tareas y proyectos para cada fase, fomentando una planificación eficiente y motivación a través de recompensas y acceso a productos y servicios de bienestar por cumplimiento de metas, mientras se comprende cómo la conexión entre el cuerpo y la mente potencia la productividad.

---

# 🚀 Características principales

- 📆 **Planificación inteligente**: Programación y reprogramación automáticas de actividades, creación de tareas por proyecto y sugerencias personalizadas según tus necesidades.
- 🎯 **Rewards**: Depósito de staking por cada actividad, con bloqueo en caso de incumplimiento y liberación al final del ciclo si se completa. Las recompensas acumuladas pueden canjearse por productos, ahorrarse, donarse o destinarse a investigaciones, con recompensas adicionales por participar.
- 🪙 **Chatbot**: Sugerencias basadas en tu historial y apoyo en la planificación diaria.
- 📲 **Integraciones y dashboard**: Conexión con smartwatches y apps para métricas en tiempo real y seguimiento completo. Análisis detallado de tu ciclo y progreso de metas. Dashboards en tiempo real para monitorear el cumplimiento diario de actividades.

---

# 🛠️ Tech Stack

- **Frontend:** React.js + TailwindCSS 
- **Backend:** Node.js + Express
- **Blockchain:** Solenium + MXNB + Hyperlane 

[Wallet Used Transactions](https://soneium-minato.blockscout.com/address/0x5d4f7Fe457A8B23c2449a585EC980E35275fa469?tab=txs)

---

### Solenium

Layer 2 donde está desplegada la app, y en la que las recompensas se entregan en $ASTR. Ofrece transacciones rápidas, accesibles y sostenibles, ideales para una aplicación de bienestar con alcance masivo.

- [Wallet Transactions](https://soneium-minato.blockscout.com/address/0x5d4f7Fe457A8B23c2449a585EC980E35275fa469?tab=txs)  
- [Some Contracts Deployed 1](https://soneium-minato.blockscout.com/tx/0x97b5369bab8ad1fb3f2bd65e695093ac72b52a7ce92ccf725bc50674323b191b)  
- [Some Contracts Deployed 2](https://soneium-minato.blockscout.com/tx/0x6b7d6737aaa335b188af6642aa4ede7bf6f5942525dfc225a5b07cb4d1e769c2)  

![Use of SCS](https://github.com/liz-durang/LearningPass/blob/main/packages/nextjs/public/LearningPass.jpg) 

---

### MXNB

Stablecoin integrada para staking dentro de la app, brindando estabilidad y accesibilidad financiera. Permite recompensar sin exposición a la volatilidad.

- [Contracts Deployed in Soneium integrating MXNB in Arbitrum Sepolia through Hyperlane](https://soneium-minato.blockscout.com/tx/0x97b5369bab8ad1fb3f2bd65e695093ac72b52a7ce92ccf725bc50674323b191b)

---

### Hyperlane

Interoperabilidad entre Solenium y Arbitrum, permitiendo integrar MXNB y otras monedas para que las usuarias realicen staking. Habilita así la expansión futura hacia más activos y funcionalidades Web3.

- [MXNB synthetic deployed in Soneium with Hyperlane Warp](https://soneium-minato.blockscout.com/tx/0x55d6cb4939a3117f1b37e713ad7544b87ba257d1b6fa971dee6e5613164a5a97)

---

# 👩‍💻 Team

**Liz Durán** ([@liz_durang](https://x.com/liz_durang)): Project Manager & Blockchain Developer  
**OlaOlaPaola** ([@OlaOlaPaola_](https://x.com/OlaOlaPaola_)): Product Manager, UI/UX Designer & Frontend Developer

---

# 🎥 Demo

[Enlace a video de demo o screenshots (próximamente)]

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
