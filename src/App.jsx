import { useEffect, useState } from "react";
import clouds from "./assets/clouds.png";
import { motion } from "framer-motion";

import image from "./assets/image.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";

function FloatingIsland({
  src,
  size,
  style,
  z = 1,
  locked = false,
  onClick,
  label
}) {
  const [showMsg, setShowMsg] = useState(false);

  const handleClick = () => {
    if (locked) {
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 2000);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      style={{
        position: "absolute",
        zIndex: z,
        cursor: "pointer",
        ...style,
      }}
      whileHover={!locked ? { scale: 1.05 } : {}}
    >
      <motion.img
        src={src}
        style={{
          width: size,
          filter: locked
            ? "grayscale(80%) brightness(0.5)"
            : "drop-shadow(0px 30px 40px rgba(0,0,0,0.45))",
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {label && (
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "18px",
            fontWeight: "700",
            fontFamily: "'Orbitron', sans-serif",
            color: "#ffffff",
            textShadow:
              "0 0 10px #00e0ff, 0 0 20px rgba(0,224,255,0.8)",
            pointerEvents: "none",
          }}
        >
          {label}
        </div>
      )}

      {locked && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "40px",
            pointerEvents: "none",
          }}
        >
          🔒
        </div>
      )}

      {showMsg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            bottom: "110%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.9)",
            padding: "12px 20px",
            borderRadius: "12px",
            color: "#fff",
            fontSize: "14px",
            whiteSpace: "nowrap",
            boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
            pointerEvents: "none",
          }}
        >
          🔒 Complete unlocked island first!
        </motion.div>
      )}
    </motion.div>
  );
}

function MovingCloud({ top, size, duration, opacity, blur = 0, z = 0 }) {
  return (
    <motion.img
      src={clouds}
      style={{
        position: "absolute",
        top: top,
        width: size,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        zIndex: z,
        pointerEvents: "none",
      }}
      animate={{ x: ["-30%", "120%"] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}

function AlgorithmScreen({ onBack }) {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [understanding, setUnderstanding] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  const resetDSA = () => {
    setSelectedTopic(null);
    setUnderstanding(null);
    setDifficulty(null);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background:
          "radial-gradient(circle at 50% 35%, #fff4c2 0%, #ffe38a 15%, #6dd5ff 40%, #2f80c9 75%, #1b3f73 100%)",
        color: "white",
        fontFamily: "'Orbitron', sans-serif",
        textAlign: "center",
        paddingTop: "80px",
        position: "relative",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => {
          if (selectedTrack === "dsa" && (selectedTopic || understanding || difficulty)) {
            resetDSA();
          } else if (selectedTrack) {
            setSelectedTrack(null);
          } else {
            onBack();
          }
        }}
        style={{
          position: "absolute",
          top: "30px",
          left: "30px",
          padding: "10px 20px",
          borderRadius: "12px",
          border: "none",
          background: "rgba(0,0,0,0.4)",
          color: "white",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h1 style={{ fontSize: "55px" }}>
        🏟 Algorithm Coliseum
      </h1>

      {/* =================== TRACK SELECTION =================== */}
      {!selectedTrack && (
        <div style={{ marginTop: "100px", display: "flex", justifyContent: "center", gap: "80px" }}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            onClick={() => setSelectedTrack("programming")}
            style={{
              width: "280px",
              padding: "50px",
              borderRadius: "25px",
              background: "linear-gradient(135deg, #00c6ff, #0072ff)",
              cursor: "pointer",
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            💻 Programming
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            onClick={() => setSelectedTrack("dsa")}
            style={{
              width: "280px",
              padding: "50px",
              borderRadius: "25px",
              background: "linear-gradient(135deg, #ffb300, #ff6f00)",
              cursor: "pointer",
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            🧠 DSA
          </motion.div>
        </div>
      )}

      {/* =================== DSA FLOW =================== */}
      {selectedTrack === "dsa" && (
        <div style={{ marginTop: "80px" }}>

          {/* TOPIC SELECTION */}
          {!selectedTopic && (
            <>
              <h2>Select Topic</h2>
              <div style={{ marginTop: "40px", display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
                {["Arrays", "Strings", "Trees", "Graphs", "DP"].map((topic) => (
                  <motion.div
                    key={topic}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedTopic(topic)}
                    style={{
                      padding: "20px 40px",
                      borderRadius: "20px",
                      background: "#1b3f73",
                      cursor: "pointer",
                    }}
                  >
                    {topic}
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* UNDERSTANDING LEVEL */}
          {selectedTopic && !understanding && (
            <>
              <h2 style={{ marginTop: "40px" }}>
                {selectedTopic} → Your Understanding Level
              </h2>

              <div style={{ marginTop: "40px", display: "flex", justifyContent: "center", gap: "40px" }}>
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <motion.div
                    key={level}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setUnderstanding(level)}
                    style={{
                      padding: "20px 40px",
                      borderRadius: "20px",
                      background: "#2f80c9",
                      cursor: "pointer",
                    }}
                  >
                    {level}
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* PRACTICE DIFFICULTY */}
          {selectedTopic && understanding && !difficulty && (
            <>
              <h2 style={{ marginTop: "40px" }}>
                Select Practice Difficulty
              </h2>

              <div style={{ marginTop: "40px", display: "flex", justifyContent: "center", gap: "40px" }}>
                {["Easy", "Medium", "Hard"].map((level) => (
                  <motion.div
                    key={level}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setDifficulty(level)}
                    style={{
                      padding: "20px 50px",
                      borderRadius: "20px",
                      background:
                        level === "Easy"
                          ? "#00e676"
                          : level === "Medium"
                          ? "#ffb300"
                          : "#ff1744",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                  >
                    {level}
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* START BUTTON */}
          {selectedTopic && understanding && difficulty && (
            <div style={{ marginTop: "60px" }}>
              <h3>
                {selectedTopic} | {understanding} | {difficulty}
              </h3>

              <motion.button
                whileHover={{ scale: 1.1 }}
                style={{
                  marginTop: "30px",
                  padding: "15px 40px",
                  borderRadius: "20px",
                  border: "none",
                  background: "#000",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                🚀 Start Practice
              </motion.button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [screen, setScreen] = useState("world");

  if (screen === "algorithm") {
    return <AlgorithmScreen onBack={() => setScreen("world")} />;
  }

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / 40;
    const y = (e.clientY - innerHeight / 2) / 40;
    setMouse({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        height: "100vh",
        width: "100vw",
        background:
          "radial-gradient(circle at 50% 30%, #dff6ff 0%, #8ecae6 40%, #5aa9e6 70%, #3a86c4 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MovingCloud top="0%" size="1000px" duration={150} opacity={0.35} blur={8} z={0} />
      <MovingCloud top="0%" size="900px" duration={120} opacity={0.45} blur={6} z={0} />
      <MovingCloud top="30%" size="800px" duration={90} opacity={0.55} blur={3} z={1} />
      <MovingCloud top="55%" size="850px" duration={70} opacity={0.6} blur={0} z={2} />

      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: `translate(-50%, -50%) translate(${mouse.x}px, ${mouse.y}px)`,
          transition: "transform 0.08s ease-out",
          width: "900px",
          height: "700px",
          zIndex: 5,
        }}
      >
        <FloatingIsland
          src={image4}
          size="350px"
          label="🏟 Algorithm Coliseum"
          onClick={() => setScreen("algorithm")}
          style={{
            top: "50px",
            left: "32%",
            transform: "translateX(-50%)",
          }}
        />

        <FloatingIsland
          src={image}
          size="420px"
          label="🐞 Bugstorm Island"
          style={{
            bottom: "0px",
            left: "32%",
            transform: "translateX(-50%)",
          }}
        />

        <FloatingIsland
          src={image2}
          size="340px"
          locked={true}
          label="🔎 Edgecase Enclave"
          style={{
            bottom: "150px",
            left: "75%",
            transform: "translateX(-190%)",
          }}
        />

        <FloatingIsland
          src={image3}
          size="360px"
          locked={true}
          label="⚡ Optimization Forge"
          style={{
            bottom: "200px",
            left: "30%",
            transform: "translateX(90%)",
          }}
        />
      </div>
    </div>
  );
}

export default App;
