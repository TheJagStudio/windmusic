import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { PlayerAtom, PlayAtom, TimeAtom, VolumeAtom, CurrentVideoIDAtom } from "../Variables";

const Player = () => {
    const [data, setData] = useAtom(PlayerAtom);
    const [play, setPlay] = useAtom(PlayAtom);
    const [time, setTime] = useAtom(TimeAtom);
    const [volume, setVolume] = useAtom(VolumeAtom);
    const [videoId, setVideoId] = useAtom(CurrentVideoIDAtom);
    useEffect(() => {
        let tempData = localStorage.getItem("playerData");
        if (tempData) {
            setData(JSON.parse(tempData));
            let parsedData = JSON.parse(tempData);
            if (parsedData.videoId !== undefined && parsedData.videoId !== null && parsedData.videoId !== "") {
                fetch(process.env.REACT_APP_SERVER + "/api/song/" + parsedData.videoId)
                    .then((res) => res.json())
                    .then((response) => {
                        localStorage.setItem("playerData", JSON.stringify(response));
                        setData(response);
                        setPlay(false);
                        setTime(0);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }
    }, []);
    useEffect(() => {
        if (videoId !== undefined && videoId !== null && videoId !== "") {
            fetch(process.env.REACT_APP_SERVER + "/api/song/" + videoId)
                .then((res) => res.json())
                .then((response) => {
                    localStorage.setItem("playerData", JSON.stringify(response));
                    setData(response);
                    setPlay(false);
                    setTime(0);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [videoId]);
    useEffect(() => {
        if (play) {
            document.getElementById("mainAudio").play();
            if (document.getElementById("musicVideo") !== null) {
                document.getElementById("musicVideo").play();
            }
        } else {
            document.getElementById("mainAudio").pause();
            if (document.getElementById("musicVideo") !== null) {
                document.getElementById("musicVideo").pause();
            }
        }
    }, [play]);
    return (
        <div className="z-50 fixed bottom-0 left-0 bg-[#212121] h-20 w-full">
            <div className="z-50 absolute group bottom-[calc(100%+2.5rem)] right-10 w-64 h-auto rounded-lg overflow-hidden flex flex-nowrap justify-center items-center bg-black transition-all">
                <button
                    onClick={(event) => {
                        event.currentTarget.parentElement.classList.toggle("w-64");
                        event.currentTarget.parentElement.classList.toggle("w-96");
                        document.getElementById("expandViwer").classList.toggle("hidden");
                        document.getElementById("minimseViwer").classList.toggle("hidden");
                    }}
                    className="absolute top-3 right-3 group-hover:opacity-100 opacity-0 z-10"
                >
                    <svg width={20} height={20} viewBox="0 0 15 15" className="text-white" xmlns="http://www.w3.org/2000/svg">
                        <path id="expandViwer" className="" fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M1 1h4v1H2.707l3.147 3.146-.708.708L2 2.707V5H1V1Zm11.293 1H10V1h4v4h-1V2.707L9.854 5.854l-.708-.708L12.293 2Zm-6.44 7.854L2.708 13H5v1H1v-4h1v2.293l3.146-3.147.708.708Zm4-.708L13 12.293V10h1v4h-4v-1h2.293L9.146 9.854l.708-.708Z" />
                        <path id="minimseViwer" className="hidden" fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M13.854 1.854 10.707 5H13v1H9V2h1v2.293l3.146-3.147.708.708ZM4.293 5 1.146 1.854l.708-.708L5 4.293V2h1v4H2V5h2.293ZM2 9h4v4H5v-2.293l-3.146 3.147-.708-.707L4.293 10H2V9Zm7 0h4v1h-2.293l3.147 3.146-.708.708L10 10.707V13H9V9Z" />
                    </svg>
                </button>
                {data?.videoStreams !== undefined ? (
                    <video
                        id="musicVideo"
                        muted={true}
                        src={data?.videoStreams?.[0]}
                        onError={(event) => {
                            // set src to next stream
                            let currentStream = event.currentTarget.src;
                            let currentIndex = data?.videoStreams?.indexOf(currentStream);
                            if (currentIndex === -1) {
                                console.log("Error: Stream not found");
                            } else {
                                let nextStream = data?.videoStreams?.[currentIndex + 1];
                                event.currentTarget.src = nextStream;
                            }
                        }}
                        className="w-full h-auto object-contain z-0"
                    />
                ) : (
                    <img
                        src={data?.thumbnail}
                        onLoad={(event) => {
                            event.currentTarget.classList.remove("opacity-0");
                        }}
                        className="w-full h-full opacity-0 object-cover"
                    />
                )}
            </div>
            <div>
                <div className="w-full h-fit">
                    <div className="relative h-2 flex items-center justify-center bg-transparent ">
                        <div className="absolute top-1/2 z-0 -translate-y-1/2 left-0 bg-[#ff0000] h-1 " style={{ width: time + "%" }}></div>
                        <div className="absolute top-1/2 z-0 -translate-y-1/2 right-0 bg-white/25 h-1 " style={{ width: 100 - time + "%" }}></div>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            step={0.01}
                            value={time}
                            onChange={(event) => {
                                setTime(event.currentTarget.value);
                                document.getElementById("mainAudio").currentTime = (event.currentTarget.value * document.getElementById("mainAudio").duration) / 100;
                            }}
                            className="z-20 plyerSlider"
                        />
                    </div>
                </div>
                <div className=" w-full h-[calc(5rem-8px)] px-10 flex flex-nowrap items-center justify-between">
                    <div className="flex flex-nowrap gap-6 items-center justify-center">
                        <button>
                            <svg width={26} height={26} className="text-white rotate-180" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="M3.762 7.22v9.57c0 1.96 2.13 3.19 3.83 2.21l4.15-2.39 4.15-2.4c1.7-.98 1.7-3.43 0-4.41l-4.15-2.4-4.15-2.39c-1.7-.98-3.83.24-3.83 2.21Zm16.476 11.71c-.41 0-.75-.34-.75-.75V5.82c0-.41.34-.75.75-.75s.75.34.75.75v12.36c0 .41-.33.75-.75.75Z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => {
                                setPlay(!play);
                                document.getElementById("mainAudio").paused ? document.getElementById("mainAudio").play() : document.getElementById("mainAudio").pause();
                            }}
                        >
                            {play ? (
                                <svg width={36} height={36} className="text-white " viewBox="0 0 16 16">
                                    <path fill="currentColor" d="M6.964 3.68A.684.684 0 0 0 6.286 3H4.93a.684.684 0 0 0-.678.68v8.631c0 .374.303.677.678.677h1.355a.681.681 0 0 0 .678-.677V3.68h.001zm4.783.011a.685.685 0 0 0-.68-.681h-1.36a.683.683 0 0 0-.68.68v8.628c0 .376.304.68.68.68h1.36c.373 0 .68-.307.68-.68V3.691z" />
                                </svg>
                            ) : (
                                <svg width={36} height={36} className="text-white " viewBox="0 0 36 36">
                                    <path fill="currentColor" d="M32.16 16.08 8.94 4.47A2.07 2.07 0 0 0 6 6.32v23.21a2.06 2.06 0 0 0 3 1.85l23.16-11.61a2.07 2.07 0 0 0 0-3.7Z" />
                                </svg>
                            )}
                        </button>
                        <button>
                            <svg width={26} height={26} className="text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="M3.762 7.22v9.57c0 1.96 2.13 3.19 3.83 2.21l4.15-2.39 4.15-2.4c1.7-.98 1.7-3.43 0-4.41l-4.15-2.4-4.15-2.39c-1.7-.98-3.83.24-3.83 2.21Zm16.476 11.71c-.41 0-.75-.34-.75-.75V5.82c0-.41.34-.75.75-.75s.75.34.75.75v12.36c0 .41-.33.75-.75.75Z" />
                            </svg>
                        </button>
                        <p id="timer" className="text-white/50">
                            0:00 / 0:00
                        </p>
                    </div>
                    <div className="text-white gap-3 flex-nowrap hidden md:flex items-center justify-center">
                        <img
                            src={data?.thumbnail}
                            onLoad={(event) => {
                                event.currentTarget.classList.remove("opacity-0");
                            }}
                            className="w-14 h-14 object-cover rounded-lg"
                        />
                        <div className="flex flex-col w-64">
                            <p className="truncate">{data?.title}</p>
                            <p className="opacity-50 truncate-2">{data?.subTitle}</p>
                        </div>
                    </div>
                    <div className="flex flex-nowrap items-center justify-start">
                        <div className="flex flex-nowrap gap-3 group items-center justify-center">
                            <div className="w-24 scale-x-0 group-hover:scale-x-100 transition-all origin-right">
                                <div className="relative h-3 flex items-center justify-center">
                                    <div className="absolute top-1/2 z-0 -translate-y-1/2 left-0 bg-white h-1 " style={{ width: volume + "%" }}></div>
                                    <div className="absolute top-1/2 z-0 -translate-y-1/2 right-0 bg-white/25 h-1 " style={{ width: 100 - volume + "%" }}></div>
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={0.01}
                                        value={volume}
                                        onChange={(event) => {
                                            setVolume(event.currentTarget.value);
                                            document.getElementById("mainAudio").volume = event.currentTarget.value / 100;
                                        }}
                                        className="z-20 sliderVolume"
                                    />
                                </div>
                            </div>
                            <svg width={26} height={26} viewBox="0 0 24 24" className="text-white/40 group-hover:text-white">
                                <path fill="currentColor" d="M11.193 4.452 5.67 9H2.376A1.376 1.376 0 0 0 1 10.376v3.248A1.376 1.376 0 0 0 2.376 15h3.293l5.524 4.548a.51.51 0 0 0 .807-.414V4.866a.51.51 0 0 0-.807-.414zM11 18.088 6.028 14H2.375A.375.375 0 0 1 2 13.625v-3.25A.375.375 0 0 1 2.375 10h3.653L11 5.911zm4.47-12.744A9.975 9.975 0 0 1 18 11.987a9.848 9.848 0 0 1-2.566 6.646l-.74-.672A8.872 8.872 0 0 0 17 11.987a8.984 8.984 0 0 0-2.277-5.978zm3.46-3.933A15.817 15.817 0 0 1 23 11.989a15.945 15.945 0 0 1-4.035 10.576l-.735-.65A14.966 14.966 0 0 0 22 11.988a14.852 14.852 0 0 0-3.8-9.924z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <audio
                    id="mainAudio"
                    onPlay={(event) => {
                        if (document.getElementById("musicVideo") !== null) {
                            document.getElementById("musicVideo").play();
                        }
                        window.playerInterval = setInterval(() => {
                            try {
                                let player = document.getElementById("mainAudio");
                                let playerProgress = (player.currentTime * 100) / player.duration;
                                setTime(playerProgress.toFixed(2));
                                document.getElementById("timer").innerText = Math.floor(player.currentTime / 60) + " : " + Math.floor(player.currentTime % 60) + " / " + Math.floor(player.duration / 60) + ":" + Math.floor(player.duration % 60);
                            } catch (err) {}
                        }, 500);
                    }}
                    onPause={() => {
                        clearInterval(window.playerInterval);
                        if (document.getElementById("musicVideo") !== null) {
                            document.getElementById("musicVideo").pause();
                        }
                    }}
                    src={data?.streams?.[0]}
                    onError={(event) => {
                        // set src to next stream
                        let currentStream = event.currentTarget.src;
                        let currentIndex = data?.streams?.indexOf(currentStream);

                        if (currentIndex === -1) {
                            console.log("Error: Stream not found");
                        } else {
                            let nextStream = data?.streams?.[currentIndex + 1];
                            event.currentTarget.src = nextStream;
                        }
                    }}
                    className="absolute bottom-[120%] right-96 w-64 h-20 hidden"
                    controls
                ></audio>
            </div>
        </div>
    );
};

export default Player;
