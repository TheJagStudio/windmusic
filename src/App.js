import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAtom } from "jotai";

import Home from "./Pages/Home";
import NavbarCus from "./Components/NavbarCus";
import Sidebar from "./Components/Sidebar";
import Player from "./Components/Player";
import Playlist from "./Pages/Playlist";
import Search from "./Pages/Search";

import { BackgroundAtom } from "./Variables";

function App() {
    const [background, setBackground] = useAtom(BackgroundAtom);
    return (
        <div className="relative bg-black min-h-screen overflow-x-hidden">
            {background && (
                <div className="absolute top-0 left-0 z-0 opacity-50 w-full">
                    <img
                        src={background}
                        className="opacity-0 transition-all duration-1000 w-full"
                        onLoad={(event) => {
                            event.currentTarget.classList.remove("opacity-0");
                        }}
                        alt=""
                    />
                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black"></div>
                </div>
            )}
            (!background && <div className="absolute bg-[#0f1e39] z-10 -top-20 scale-150 -left-20 w-[55%] h-64 rounded-bl-full blur-[100px]"></div>) (!background && <div className="absolute bg-[#0d2832] z-10 -top-20 scale-150 -right-20 w-[55%] h-64 rounded-bl-full blur-[100px]"></div>)
            <NavbarCus />
            <div className="relative flex flex-nowrap w-full min-h-[calc(100vh-4.5rem)] z-30 mt-[4.5rem]">
                <Sidebar />
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/playlist/:playlistId" element={<Playlist />} />
                        <Route path="/search" element={<Search />} />
                    </Routes>
                </Router>
            </div>
            <Player />
        </div>
    );
}

export default App;
