import { useState } from "preact/hooks";
import "./app.css";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello, World!</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </>
  );
}
