import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";

import GridSlider from "../Components/GridSlider";
import NormalSlider from "../Components/NormalSlider";

import { HomeAtom, BackgroundAtom } from "../Variables";

const Home = () => {
    const [data, setData] = useAtom(HomeAtom);
    const [newData, setNewData] = useState([]);
    const [background, setBackground] = useAtom(BackgroundAtom);
    const [activeHeader, setActiveHeader] = useState("");

    async function appendData(newDataInput) {
        console.log(newData);
        setNewData((prev) => [...prev, ...newDataInput.data]);
        let temp = {
            continuation: newDataInput.continuation,
            itct: newDataInput.itct,
            visitorData: newDataInput.visitorData,
        };
        localStorage.setItem("home", JSON.stringify(temp));
    }

    useEffect(() => {
        window.scrollBottom = true;
        fetch(process.env.REACT_APP_SERVER + "/api/home")
            .then((res) => res.json())
            .then((response) => {
                setData(response);
                setBackground(response.background);
                let temp = {
                    continuation: response.continuation,
                    itct: response.itct,
                    visitorData: response.visitorData,
                };
                localStorage.setItem("home", JSON.stringify(temp));
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

            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            let clientHeight = document.documentElement.clientHeight || window.innerHeight;

            if (scrollTop + clientHeight + 50 >= scrollHeight) {
                if (window.scrollBottom) {
                    window.scrollBottom = false;
                    let temp = JSON.parse(localStorage.getItem("home"));
                    fetch(process.env.REACT_APP_SERVER + "/api/homeScroll?continuation=" + temp.continuation + "&itct=" + temp.itct + "&visitorData=" + temp.visitorData)
                        .then((res) => res.json())
                        .then((response) => {
                            appendData(response);
                            window.scrollBottom = true;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        });
    }, []);
    return (
        <div className="relative z-0 w-full sm:w-[calc(100%-5rem)] ml-0 sm:ml-20 p-5 px-5 sm:px-20">
            <div className="flex flex-nowrap gap-3 text-white overflow-x-scroll noScrollBar py-5 mb-5">
                {data?.headers?.map((header, index) => {
                    return (
                        <p
                            onClick={() => {
                                let temp = JSON.parse(localStorage.getItem("home"));
                                setActiveHeader(header.label);
                                fetch(process.env.REACT_APP_SERVER + "/api/home?browseId=" + header.browseId + "&params=" + header.params + "&visitorData=" + temp.visitorData)
                                    .then((res) => res.json())
                                    .then((response) => {
                                        setData(response);
                                        setBackground(response.background);
                                        setNewData([]);
                                        let temp = {
                                            continuation: response.continuation,
                                            itct: response.itct,
                                            visitorData: response.visitorData,
                                        };
                                        localStorage.setItem("home", JSON.stringify(temp));
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            }}
                            key={index}
                            className={"border border-white/20 cursor-pointer p-2 px-3 whitespace-nowrap rounded-lg backdrop-blur-md " + (activeHeader === header.label ? "bg-white text-black" : "bg-white/10 hover:bg-white/20")}
                        >
                            {header.label}
                        </p>
                    );
                })}
            </div>
            {data?.data?.map((item, index) => {
                return <NormalSlider title={item.title} subTitle={item.subTitle} data={item.data} />;
            })}
            {newData?.map((item, index) => {
                return <NormalSlider title={item.title} subTitle={item.subTitle} data={item.data} />;
            })}
            {/* <GridSlider title={"Quick picks"} subTitle={"START RADIO BASED ON A SONG"} /> */}
        </div>
    );
};

export default Home;
