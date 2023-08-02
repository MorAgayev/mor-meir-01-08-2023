import { BrowserRouter, Routes, Route} from "react-router-dom";
import { AppHeader } from "./components/AppHeader";
import { Weather } from "./pages/Weather";
import { Favorite } from "./pages/Favorite";

function App() {  

  return (
    <div className="main-app">
      <BrowserRouter basename="/">
        <AppHeader />
        <Routes>
          <Route path="/" element={<Weather/>}/>
          <Route path="/favorite" element={<Favorite/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
