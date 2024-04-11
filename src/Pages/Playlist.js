import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { CurrentVideoIDAtom, CurrentPlaylistIDAtom } from "../Variables";

const Playlist = () => {
    const { playlistId } = useParams();
    const [data, setData] = useState({});
    const [videoId, setVideoId] = useAtom(CurrentVideoIDAtom);
    useEffect(() => {
        fetch(`/api/playlist/${playlistId}`)
            .then((res) => res.json())
            .then((response) => {
                setData(response);
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        window.addEventListener("scroll", () => {
            const navbar = document.getElementById("navbar");
            if (navbar) {
                if (window.scrollY > 10) {
                    navbar.classList.add("bg-black");
                    navbar.classList.remove("bg-transparent");
                    navbar.classList.add("border-b-white/30");
                } else {
                    navbar.classList.add("bg-transparent");
                    navbar.classList.remove("bg-black");
                    navbar.classList.remove("border-b-white/30");
                }
            }
            const sidebar = document.getElementById("sidebar");
            if (sidebar) {
                if (window.scrollY > 10) {
                    sidebar.classList.add("bg-black");
                    sidebar.classList.add("border-r-white/30");
                    sidebar.classList.remove("border-r-transparent");
                } else {
                    sidebar.classList.remove("bg-black");
                    sidebar.classList.remove("border-r-white/30");
                    sidebar.classList.add("border-r-transparent");
                }
            }
        });
    }, []);
    return (
        <div className="relative z-0 w-[calc(100%-5rem)] ml-20 p-5 px-20 mb-20">
            <div className="flex flex-nowrap gap-10 mt-5 text-white ">
                <img src={data.thumbnail} className="w-64 h-64 rounded-lg object-cover" alt="" />
                <div className="flex flex-nowrap gap-2 flex-col items-start justify-start">
                    {data?.title && <h1 className="text-3xl font-bold">{data.title}</h1>}
                    {data?.subtitle && <p className="text-white/70">{data.subtitle}</p>}
                    {data?.secondSubtitle && <p className="text-white/70">{data.secondSubtitle}</p>}
                    {data.description && (
                        <p id="discription" className="truncate-2 text-white/70">
                            {data.description}
                        </p>
                    )}
                    {data.description && (
                        <button
                            onClick={(event) => {
                                event.currentTarget.innerHTML === "MORE" ? (event.currentTarget.innerHTML = "LESS") : (event.currentTarget.innerHTML = "MORE");
                                document.getElementById("discription").classList.toggle("truncate-4");
                            }}
                            className="text-white/70 font-bold text-lg cursor-pointer"
                        >
                            MORE
                        </button>
                    )}
                    <button className="bg-white text-black px-5 py-2 rounded-full font-semibold">PLAY ALL</button>
                </div>
            </div>
            <div className="flex flex-col items-start justify-between w-full text-white mt-16">
                {data?.data?.map((item, index) => {
                    return (
                        <div
                            onClick={() => {
                                if (item.type === "song") {
                                    setVideoId(item.videoId);
                                }
                            }}
                            className="grid grid-cols-4 gap-3 w-full p-6 items-center justify-start border-b last:border-b-0 border-white/20 hover:bg-white/25"
                        >
                            <div className="flex flex-nowrap gap-3 col-span-2 items-center justify-start">
                                <p className="opacity-50">{index + 1}</p>
                                {item.thumbnail && <img src={item.thumbnail} className="w-16 h-16 rounded-lg object-cover" alt="" />}
                                <p>{item.title}</p>
                            </div>
                            <p className="opacity-50">{item.subTitle}</p>
                            <p className="text-end opacity-50">{item.time}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Playlist;
