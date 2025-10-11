import { useState } from "react";
import "../../App.css";

export default function Read() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);
  // stage: 'idle' (初始信封) -> 'opening' (信封消失动画) -> 'letter' (显示信件内容)
  const [stage, setStage] = useState("idle");

  const envelopeImg = "/firstpagecover.jpg";

  // Handle click on the wax seal
  const handleSealClick = async () => {
    if (!code.trim()) {
      alert("Please enter the correct code before opening!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/letters/${code}`);
      if (!res.ok) {
        alert("No letter found for this code.");
        return;
      }

      const data = await res.json();
      setMessage(data.encrypted_message);

      // 开始信封消失动画
      setStage("opening");
    } catch (err) {
      console.error(err);
      alert("⚠️ Server connection error. Please try again later.");
    }
  };

  // 当信封消失动画完成时
  const handleEnvelopeTransitionEnd = (e) => {
    if (stage === "opening" && e.propertyName === "transform") {
      // 信封消失后立即显示信件内容
      setStage("letter");
    }
  };

  const isIdle = stage === "idle";
  const isOpening = stage === "opening";
  const isLetter = stage === "letter";

  return (
    <div style={{ position: "relative" }}>
      {/* Top-left hint text */}
      {!isLetter && (
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            fontSize: "12px",
            color: "rgba(0,0,0,0.5)",
            zIndex: 10,
          }}
        >
          Click the wax seal to open the letter
        </div>
      )}

      {/* 信封容器 - 始终存在，但根据阶段显示不同内容 */}
      <div
        className="envelope-container"
        onTransitionEnd={handleEnvelopeTransitionEnd}
        style={{
          backgroundImage: `url(${envelopeImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "70vw",
          height: "60vh",
          margin: "auto",
          marginTop: "5vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
          position: "relative",
          // 动画控制
          transform: isOpening ? "rotateX(90deg)" : "none",
          opacity: isOpening ? 0 : 1,
          transition: "transform 0.8s ease-in-out, opacity 0.8s ease-in-out",
          // 当显示信件内容时隐藏信封容器
          visibility: isLetter ? "hidden" : "visible",
        }}
      >
        {/* 蜡封 (仅在idle阶段可点击) */}
        {isIdle && (
          <div
            onClick={handleSealClick}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, #b71c1c, #7f0000)",
              boxShadow:
                "inset 2px 2px 5px rgba(255,255,255,0.3), inset -4px -4px 6px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.5)",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow =
                "inset 2px 2px 5px rgba(255,255,255,0.4), inset -4px -4px 6px rgba(0,0,0,0.5), 0 6px 15px rgba(0,0,0,0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow =
                "inset 2px 2px 5px rgba(255,255,255,0.3), inset -4px -4px 6px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.5)";
            }}
          >
            <span
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.8)",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                letterSpacing: "1px",
              }}
            >
              SEAL
            </span>
          </div>
        )}
      </div>

      {/* 信件内容 (在信封消失后显示) */}
      {isLetter && (
        <div
          style={{
            background: "url('/firstpagecover.jpg')", // 使用羊皮纸纹理
            backgroundSize: "cover",
            width: "65vw",
            height: "70vh",
            margin: "auto",
            marginTop: "5vh",
            borderRadius: "12px",
            padding: "30px",
            overflowY: "auto",
            boxShadow: "inset 0 0 25px rgba(0,0,0,0.25), 0 0 20px rgba(0,0,0,0.3)",
            textAlign: "center",
            fontFamily: "'Times New Roman', serif",
            color: "#3b2f2f",
            opacity: 0,
            animation: "fadeIn 1.2s forwards ease-in-out",
          }}
        >
          <h2
            style={{
              fontFamily: "Cursive",
              marginBottom: "10px",
              color: "#5b3a29",
            }}
          >
            Your Secret Letter
          </h2>
          <p style={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{message}</p>

          {/* 重新密封按钮 */}
          <button
            onClick={() => {
              setCode("");
              setMessage(null);
              setStage("idle");
            }}
            style={{
              marginTop: "20px",
              padding: "8px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#b71c1c",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#8b0000";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#b71c1c";
            }}
          >
            🔒 Close & Reseal
          </button>
        </div>
      )}

      {/* 代码输入区域 (仅在显示信封时显示) */}
      {!isLetter && (
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <label style={{ fontSize: "24px", color: "white" }}>
            Please enter the code given by the sender to open the letter
          </label>

          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code..."
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
              textAlign: "center",
              fontSize: "16px",
              width: "200px",
            }}
          />
        </div>
      )}
    </div>
  );
}