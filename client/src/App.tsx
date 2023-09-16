import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Game } from "./pages/Room/Game";


export function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/game" Component={Game} />
      </Routes>
    </BrowserRouter>
  );
}