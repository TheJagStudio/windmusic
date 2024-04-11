import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAtom } from "jotai";
import { CurrentVideoIDAtom, CurrentPlaylistIDAtom } from "../Variables";
import { NavLink, Navigate } from "react-router-dom";

const NormalSlider = ({ subTitle, title, data }) => {
    const [swiperRef, setSwiperRef] = useState(null);
    const [videoId, setVideoId] = useAtom(CurrentVideoIDAtom);
    const [playlistId, setPlaylistId] = useAtom(CurrentPlaylistIDAtom);
    return (
        <div className="mb-10 text-white ">
            {(subTitle !== "" || subTitle !== undefined) && <p className="opacity-50 font-light">{subTitle}</p>}
            <div className="flex flex-nowrap justify-between items-center">
                <p className="text-4xl font-semibold">{title}</p>
                <div className="flex flex-nowrap gap-3 items-center justify-center">
                    <button class="align-middle whitespace-nowrap select-none text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none p-1 px-3  border border-white/25 text-white hover:bg-white/25 rounded-full" type="button">
                        Play all
                    </button>
                    <button
                        onClick={() => {
                            swiperRef.slidePrev();
                        }}
                        class="relative align-middle select-none font-sans font-medium text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-full h-fit  rounded-full text-sm border border-white/25 text-white shadow-md shadow-gray-900/10 hover:bg-white/25"
                        type="button"
                    >
                        <svg width={30} height={30} viewBox="0 0 76 76">
                            <path fill="currentColor" d="m33.646 38 15.833 15.833H38.792L22.167 38l16.625-15.833h10.687L33.646 38Z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => {
                            swiperRef.slideNext();
                        }}
                        class="relative align-middle select-none font-sans font-medium text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-full h-fit  rounded-full text-sm border border-white/25 text-white shadow-md shadow-gray-900/10 hover:bg-white/25"
                        type="button"
                    >
                        <svg width={30} height={30} className="rotate-180" viewBox="0 0 76 76">
                            <path fill="currentColor" d="m33.646 38 15.833 15.833H38.792L22.167 38l16.625-15.833h10.687L33.646 38Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mt-5">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 40,
                        },
                    }}
                    onSwiper={setSwiperRef}
                    loop={true}
                >
                    {data?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <NavLink
                                to={item.type === "playlist" ? "/playlist/" + item.browseId : "/"}
                                onClick={() => {
                                    if (item.type === "song") {
                                        setVideoId(item.videoId);
                                    }
                                    if (item.type === "playlist") {
                                        setPlaylistId(item.browseId);
                                        Navigate("/playlist/" + item.browseId);
                                    }
                                }}
                                className="flex flex-col items-center justify-start"
                            >
                                <img src={item.thumbnail} alt="songPoster" className="w-full h-auto aspect-square rounded-lg" />
                                <div className="ml-3 mt-2 w-full">
                                    <p className="text-lg font-semibold truncate text-ellipsis">{item?.title}</p>
                                    <p className="opacity-50 truncate-2">{item?.subTitle}</p>
                                </div>
                            </NavLink>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default NormalSlider;
