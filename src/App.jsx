import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountriesList from "./components/one";
import CountryInfo from "./components/thre";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountriesList />} />
        <Route path="/country/:name" element={<CountryInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
