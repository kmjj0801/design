import { createRoot } from "react-dom/client";
import App from "./App.js"; // .tsx를 .jsx로 변경
import "./index.css";

// 타입스크립트의 non-null assertion(!) 제거
createRoot(document.getElementById("root")).render(<App />);