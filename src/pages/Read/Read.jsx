import { useState } from "react";
import "../../App.css";

export default function Read() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState(null);
  // stage: 'idle' (初始信封) -> 'opening' (信封消失动画) -> 'letter' (显示信件内容)
  const [stage, setStage] = useState("idle");
  const [isBurning, setIsBurning] = useState(false); // 🔥 控制火焰背景
  const [isGone, setIsGone] = useState(false); // 信纸是否彻底消失

  const envelopeImg = "/firstpagecover.jpg";

  // Handle click on the wax seal
  const handleSealClick = async () => {
    if (!code.trim()) {
      alert("Please enter the correct code before opening!");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/letters/${code}`
      );
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

  const handleBurn = async () => {
    setIsBurning(true);

    // Call backend to delete the letter
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/letters/${code}`, {
        method: "DELETE",
      });
    } catch (err) {
      // Ignore network error (still burn UI), but you may want to notify in production
      console.error("Failed to delete letter on backend", err);
    }

    setTimeout(() => {
      setIsGone(true);
      setIsBurning(false);
    }, 4000);
  };

  const handleReturnHome = () => {
    setCode("");
    setMessage(null);
    setStage("idle");
    setIsGone(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        width: "100vw", // ✅ 视口宽度
        height: "100vh",
        overflow: "hidden",
        // 🔥 背景切换逻辑
        background: isBurning
          ? "url('/fire oil GIF by Psyklon.gif') center/cover no-repeat" // ← burn.gif！
          : "transparent",
        transition: "background 1s ease-in-out",
        top: "66px",
        left: "0px",
      }}
    >
      {/* Top-left hint text */}
      {isIdle && (
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "300px",
            fontSize: "18px",
            color: "rgba(0,0,0,0.5)",
            zIndex: 20,
          }}
        >
          Click the wax seal to open the letter
        </div>
      )}

      {/* 信封容器 - 始终存在，但根据阶段显示不同内容 */}
      {!isLetter && (
        <div
          className="envelope-container"
          onTransitionEnd={handleEnvelopeTransitionEnd}
          style={{
            backgroundImage: `url(${envelopeImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "67vw",
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
            zIndex: 10,
            // 动画控制
            transform: isOpening ? "rotateX(90deg)" : "none",
            opacity: isOpening ? 0 : 1,
            transition: "transform 0.8s ease-in-out, opacity 0.8s ease-in-out",
            // 当显示信件内容时隐藏信封容器
            //visibility: isLetter ? "hidden" : "visible",
          }}
        >
          {/* 蜡封 (仅在idle阶段可点击) */}
          {isIdle && (
            <div
              onClick={handleSealClick}
              style={{
                width: "450px",
                height: "450px",
                backgroundImage: "url('/wax_seal_dark_4.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                cursor: "pointer",
                transition: "transform 0.2s ease, filter 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "brightness(1)";
              }}
            ></div>
          )}
        </div>
      )}

      {/* 信件内容 (在信封消失后显示) */}
      {isLetter && !isGone && (
        <div
          style={{
            background: "url('/parchment.jpg')", // 使用羊皮纸纹理
            backgroundSize: "cover",
            width: "65vw",
            height: "70vh",
            margin: "auto",
            marginTop: "5vh",
            borderRadius: "12px",
            padding: "30px",
            overflowY: "auto",
            boxShadow:
              "inset 0 0 25px rgba(0,0,0,0.25), 0 0 20px rgba(0,0,0,0.3)",
            textAlign: "center",
            fontFamily: "'Times New Roman', serif",
            color: "#3b2f2f",
            //opacity: 0,
            animation: isBurning
              ? "burnUp 3s forwards ease-in-out" // 🔥
              : "fadeIn 2s forwards ease-in-out",
            zIndex: 50,
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
            onClick={handleBurn}
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
            Close & Burn
          </button>
        </div>
      )}

      {isGone && (
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <button
            onClick={handleReturnHome}
            style={{
              padding: "10px 25px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#5b3a29",
              color: "white",
              fontSize: "18px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#7b4a39")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#5b3a29")}
          >
            Back to Read
          </button>
        </div>
      )}

      {/* 代码输入区域 (仅在显示信封时显示) */}
      {isIdle && (
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
