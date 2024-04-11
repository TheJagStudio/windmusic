import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { HomeAtom, BackgroundAtom } from "../Variables";

const Search = () => {
    const [data, setData] = useAtom(HomeAtom);
    const [activeHeader, setActiveHeader] = useState("");
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER + "/api/searchPage/" + window.location.search)
            .then((res) => res.json())
            .then((response) => {
                setData(response);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div className="relative z-0 w-[calc(100%-5rem)] ml-20 p-5 px-48">
            <div className="flex flex-nowrap gap-3 text-white overflow-x-scroll noScrollBar py-5">
                {data?.headers?.map((header, index) => {
                    return (
                        <p
                            key={index}
                            title={header.title}
                            onClick={() => {
                                setActiveHeader(header.label);
                            }}
                            className={"border border-white/20 cursor-pointer p-2 px-3 whitespace-nowrap rounded-lg backdrop-blur-md " + (activeHeader === header.label ? "bg-white text-black" : "bg-white/10 hover:bg-white/20")}
                        >
                            {header.label}
                        </p>
                    );
                })}
            </div>
            {data?.data?.map((item, index) => {
                if (item.type === "card") {
                    return (
                        <div key={index} className="my-5">
                            <p className="text-2xl text-white font-bold mb-5">{item?.mainTitle}</p>
                            <div className={"w-full grid grid-cols-2 rounded-lg h-64 overflow-hidden relative "}>
                                <img src={item.thumbnail} className="absolute top-0 left-0 w-full h-full object-cover blur-2xl opacity-40" />
                                <div className="h-full backdrop-blur-md flex gap-3 items-center justify-center bg-white/5 shadow-lg">
                                    <div>
                                        <img src={item.thumbnail} className="w-32 h-20 object-cover rounded-lg" />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-white text-2xl font-bold">{item?.title}</p>
                                        <p className="text-white/50">{item?.subTitle}</p>
                                        <button className="bg-white text-black px-5 py-2 rounded-full font-semibold">PLAY</button>
                                    </div>
                                </div>
                                <div className="h-full backdrop-blur-md"></div>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default Search;
