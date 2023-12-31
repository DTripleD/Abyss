import "./App.css";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import { useState } from "react";
import { Position } from "./components/Body/types";

const scaleVars: number[] = [
  0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.25, 1.5,
];

function App() {
  const [scale, setScale] = useState<number>(1);
  const [elementWidth, setElementWidth] = useState<number>(0);
  const [elementPosition, setElementPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  return (
    <div className="App">
      <Header
        scale={scale}
        setScale={setScale}
        scaleVars={scaleVars}
        setElementPosition={setElementPosition}
        elementWidth={elementWidth}
      />
      <Body
        scale={scale}
        elementPosition={elementPosition}
        setElementPosition={setElementPosition}
        setElementWidth={setElementWidth}
      />
    </div>
  );
}

export default App;
