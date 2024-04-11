import React, { useEffect, useState } from "react";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { useAtom } from "jotai";
import { CurrentVideoIDAtom } from "../Variables";

const NavbarCus = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [videoId, setVideoId] = useAtom(CurrentVideoIDAtom);

    return (
        <div className="w-full fixed top-0 z-50">
            <Navbar id="navbar" className="bg-transparent !bg-opacity-100  !backdrop-saturate-100 !backdrop-blur-none border-0  border-b border-transparent  shadow-none h-[4.5rem] max-w-full rounded-none px-4 py-2 lg:px-8 transition-all duration-500">
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                        <Typography as="a" href="/" className="flex flex-nowrap gap-3 items-center justify-center mr-4 cursor-pointer py-1.5 font-bold text-2xl">
                            <img src="/images/logo.png" className="w-10 h-10" alt="songPoster" />
                            <span className="hidden sm:block">Music</span>
                        </Typography>
                        <div className="w-auto mr-5 sm:w-[30rem] px-4 h-fit bg-white/15 backdrop-blur-md group hover:bg-black border hover:border-b-0 border-white/20 rounded-lg hover:rounded-b-none relative transition-all duration-100">
                            <input
                                value={searchQuery}
                                onChange={(event) => {
                                    setSearchQuery(event.currentTarget.value);
                                    if (window.searchBuffer) {
                                        clearTimeout(window.searchBuffer);
                                    }
                                    window.searchBuffer = setTimeout(() => {
                                        fetch(process.env.REACT_APP_SERVER + "/api/search/?query=" + searchQuery)
                                            .then((res) => res.json())
                                            .then((data) => {
                                                setSearchResult(data["data"]);
                                            })
                                            .catch((err) => {
                                                console.log(err);
                                            });
                                    }, 1000);
                                }}
                                type="text"
                                className="w-full h-full bg-transparent text-white peer placeholder:text-white/50 p-2.5 pl-10 rounded-lg outline-none"
                                placeholder="Search songs, albums, artists, podcasts"
                            />
                            <svg className="absolute top-0 left-3 h-10 w-auto aspect-square p-2.5 text-white/50 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                            </svg>
                            {searchQuery !== "" && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSearchResult([]);
                                    }}
                                    className="absolute top-0 right-0 h-10 w-auto aspect-square p-2 text-white/50 group-hover:text-white cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24">
                                        <path
                                            style={{
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                            }}
                                            d="M19 19 5 5"
                                        />
                                        <path
                                            style={{
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                            }}
                                            d="M19 5 5 19"
                                        />
                                    </svg>
                                </button>
                            )}
                            <div className="bg-black flex flex-col w-full h-0 group-hover:h-fit min-h-0  group-hover:py-4 overflow-hidden group-hover:min-h-4 border-0 group-hover:border  group-hover:w-[calc(100%+1.75px)] group-hover:translate-x-[-0.75px] rounded-b-lg border-white/20 transition-all duration-100 absolute top-full left-0">
                                {searchResult.length > 0 &&
                                    searchResult.map((item, index) => {
                                        if (item.type === "suggestion") {
                                            return (
                                                <a href={"/search?q=" + item.title} className="flex flex-nowrap items-center justify-start opacity-50 hover:bg-white/25 px-4 py-2 cursor-pointer">
                                                    <svg className="h-10 w-auto aspect-square p-2.5 text-white/50 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
                                                        <path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                                    </svg>
                                                    <p key={index}>{item.title}</p>
                                                </a>
                                            );
                                        } else if (item.type === "song") {
                                            return (
                                                <div
                                                    onClick={() => {
                                                        setVideoId(item.videoId);
                                                    }}
                                                    className="flex flex-nowrap justify-start items-center hover:bg-white/25 px-4 py-2 cursor-pointer"
                                                >
                                                    <img src={item.thumbnail} className="w-10 h-10 rounded-lg" alt="songPoster" />
                                                    <div className="ml-3">
                                                        <p className="text-lg font-semibold truncate text-ellipsis">{item.title}</p>
                                                        <p className="opacity-50 truncate">{item.subTitle}</p>
                                                    </div>
                                                </div>
                                            );
                                        } else if (item.type === "playlist") {
                                            return (
                                                <a target="_blank" href={"https://music.youtube.com/playlist?list=" + item.playlistId} className="flex flex-nowrap justify-start items-center hover:bg-white/25 px-4 py-2 cursor-pointer">
                                                    <img src={item.thumbnail} className="w-10 h-10 rounded-lg" alt="songPoster" />
                                                    <div className="ml-3">
                                                        <p className="text-lg font-semibold truncate text-ellipsis">{item.title}</p>
                                                        <p className="opacity-50 truncate">{item.subTitle}</p>
                                                    </div>
                                                </a>
                                            );
                                        } else if (item.type === "artist") {
                                            return (
                                                <a target="_blank" href={"https://music.youtube.com/channel/" + item.channelId} className="flex flex-nowrap justify-start items-center hover:bg-white/25 px-4 py-2 cursor-pointer">
                                                    <img src={item.thumbnail} className="w-10 h-10 rounded-lg" alt="songPoster" />
                                                    <div className="ml-3">
                                                        <p className="text-lg font-semibold truncate text-ellipsis">{item.title}</p>
                                                    </div>
                                                </a>
                                            );
                                        }
                                    })}
                            </div>
                        </div>
                    </div>
                    <Button variant="outlined" size="sm" className="rounded-full h-10 w-10 p-1 border-white">
                        <img src="https://yt3.ggpht.com/pJSQ297OSp8bA5jRSP6wRZ2EpinNXiPhiU7iwKaoTHnFHqEHU9rqnSBO468KCwNboOysrld9HQ=s108-c-k-c0x00ffffff-no-rj" className="rounded-full h-8 w-8" alt="songPoster" />
                    </Button>
                </div>
            </Navbar>
        </div>
    );
};

export default NavbarCus;
