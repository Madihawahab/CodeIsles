import { useEffect, useState } from "react"
import clouds from "./assets/clouds.png"
import { motion } from "framer-motion"

import image from "./assets/image.png"
import image2 from "./assets/image2.png"
import image3 from "./assets/image3.png"
import image4 from "./assets/image4.png"

function FloatingIsland({
  src,
  size,
  style,
  z = 1,
  locked = false,
  onClick,
  label
}) {
  const [showMsg, setShowMsg] = useState(false)

  const handleClick = () => {
    if (locked) {
      setShowMsg(true)
      setTimeout(() => setShowMsg(false), 2000)
    } else if (onClick) {
      onClick()
    }
  }

  return (
    <motion.div
      onClick={handleClick}
      style={{
        position: "absolute",
        zIndex: z,
        cursor: "pointer",
        ...style,
      }}
      whileHover={!locked ? { y: -20, scale: 1.05 } : {}}
    >
      <motion.img
        src={src}
        style={{
          width: size,
          filter: locked
            ? "grayscale(80%) brightness(0.5)"
            : "drop-shadow(0px 30px 40px rgba(0,0,0,0.45))",
        }}
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5, // ✅ FIX: delay animation slightly
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: -10 }}
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
  )
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
  )
}

function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [ready, setReady] = useState(false) // ✅ NEW

  useEffect(() => {
    setReady(true) // enable parallax AFTER first render
  }, [])

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window
    const x = (e.clientX - innerWidth / 2) / 40
    const y = (e.clientY - innerHeight / 2) / 40
    setMouse({ x, y })
  }

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
          width: "1100px",
          height: "1100px",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,245,220,0.8) 0%, rgba(255,255,255,0.35) 40%, transparent 75%)",
          filter: "blur(150px)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      <h1
        style={{
          position: "absolute",
          top: "10px",
          width: "100%",
          textAlign: "center",
          fontSize: "60px",
          fontWeight: "800",
          fontFamily: "'Orbitron', sans-serif",
          color: "#ffffff",
          textShadow:
            "0 0 10px #00b4ff, 0 0 20px #00b4ff, 0 0 40px rgba(0,180,255,0.7)",
          letterSpacing: "3px",
          zIndex: 20,
        }}
      >
        CodeIsles 🏝
      </h1>

      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: ready
            ? `translate(-50%, -50%) translate(${mouse.x}px, ${mouse.y}px)`
            : "translate(-50%, -50%)", // ✅ FIXED
          transition: "transform 0.08s ease-out",
          width: "900px",
          height: "700px",
          zIndex: 5,
        }}
      >
        {/* Islands unchanged */}
        <FloatingIsland
          src={image4}
          size="350px"
          z={3}
          locked={false}
          label="🏟 Algorithm Coliseum"
          style={{
            top: "50px",
            left: "32%",
            transform: "translateX(-50%)",
          }}
        />

        <FloatingIsland
          src={image}
          size="420px"
          z={3}
          locked={false}
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
          z={2}
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
          z={2}
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
  )
}

export default App
