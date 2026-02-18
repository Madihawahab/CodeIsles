import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function TopicCard({ title, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200 }}
      onClick={onClick}
      style={{
        background: "linear-gradient(135deg, #00c6ff, #0072ff)",
        color: "#ffffff",
        padding: "30px",
        borderRadius: "20px",
        width: "220px",
        textAlign: "center",
        fontWeight: "700",
        fontSize: "18px",
        cursor: "pointer",
        boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
      }}
    >
      {title}
    </motion.div>
  );
}

function LevelCard({ level }) {
  const colors = {
    Easy: "#00e676",
    Medium: "#ffb300",
    Hard: "#ff1744",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        padding: "20px 60px",
        borderRadius: "20px",
        background: colors[level],
        cursor: "pointer",
        fontWeight: "700",
        fontSize: "20px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
      }}
    >
      {level}
    </motion.div>
  );
}

function AlgorithmBattle({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
const [selectedLevel, setSelectedLevel] = useState(null);

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
          if (selectedTopic) {
            setSelectedTopic(null);
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

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: "55px",
          letterSpacing: "3px",
          textShadow:
            "0 0 15px #ffe38a, 0 0 35px rgba(255, 215, 0, 0.7)",
        }}
      >
        🏟 Algorithm Coliseum
      </motion.h1>

      <AnimatePresence mode="wait">
        {!selectedTopic ? (
          <motion.div
            key="topics"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p style={{ marginTop: "20px", fontSize: "20px" }}>
              Choose the topic you want to practice
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                marginTop: "60px",
                flexWrap: "wrap",
              }}
            >
              {[
                "Basics",
                "Arrays",
                "Strings",
                "Recursion",
                "Trees",
                "Graphs",
              ].map((topic) => (
                <TopicCard
                  key={topic}
                  title={topic}
                  onClick={() => setSelectedTopic(topic)}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="levels"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <h2 style={{ marginTop: "60px", fontSize: "30px" }}>
              {selectedTopic} Levels
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                marginTop: "50px",
              }}
            >
              {["Easy", "Medium", "Hard"].map((level) => (
                <LevelCard key={level} level={level} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Algorithmbattle
