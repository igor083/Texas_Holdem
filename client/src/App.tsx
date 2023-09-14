import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Room } from "./pages/Room";


export function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/room" Component={Room} />
      </Routes>
    </BrowserRouter>
  );
}