import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
// import Homepage from "../components/HomPage";
import Home from "../pages/Home";
import Pokemon from "../pages/Pokemon";
import PokemonDetail from "../pages/PokemonDetail";
 
export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
                <Route index element={<Home/>} />
                <Route path="pokemon" element={<Pokemon/>} />
                <Route path="/pokemon/:id" element={<PokemonDetail />} />
            </Route>
        </Routes>
    );
}
 