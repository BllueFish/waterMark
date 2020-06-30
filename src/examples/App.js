import React from "react";
import Watermark from "../lib";

const App = () => (
  <Watermark
    text="同盾科技"
    subtext="Leo"
    options={{
      color: "#aaa",
      rotate: 30,
      fontSize: 16,
      fontFamily: "黑体",
      fontAjust: 1,
      offsetX: 100,
      offsetY: 50
    }}
  >
    <div className="content" style={{
      textAlign: "center", fontSize: 21, lineHeight: 30
    }}>
      text
  </div>
  </Watermark>
);

export default App;