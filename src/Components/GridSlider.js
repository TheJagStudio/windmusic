import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const GridSlider = ({ subTitle, title }) => {
    const [swiperRef, setSwiperRef] = useState(null);
    return (
        <div className="mb-10 text-white ">
            {(subTitle !== "" || subTitle !== undefined) && <p className="opacity-50 font-light">{subTitle}</p>}
            <div className="flex flex-nowrap justify-between items-center">
                <p className="text-4xl font-semibold">{title}</p>
                <div className="flex flex-nowrap gap-3 items-center justify-center">
                    <button class="align-middle whitespace-nowrap select-none text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none p-1 px-3  border border-gray-800 text-white hover:bg-gray-800 rounded-full" type="button">
                        Play all
                    </button>
                    <button
                        onClick={() => {
                            swiperRef.slidePrev();
                        }}
                        class="relative align-middle select-none font-sans font-medium text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-full h-fit  rounded-full text-sm border border-gray-800 text-white shadow-md shadow-gray-900/10 hover:bg-gray-800"
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
                        class="relative align-middle select-none font-sans font-medium text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-full h-fit  rounded-full text-sm border border-gray-800 text-white shadow-md shadow-gray-900/10 hover:bg-gray-800"
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
                    slidesPerView={1.5}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                    }}
                    onSwiper={setSwiperRef}
                    loop={true}
                >
                    {[1, 2, 3, 4].map(() => (
                        <SwiperSlide>
                            <div className="flex flex-col gap-3">
                                {[1, 2, 3, 4].map(() => (
                                    <div className="flex items-center justify-start">
                                        <img src="https://lh3.googleusercontent.com/IBwK4LOs4sO-Cd-_5YO4XC2B2N1hvyBvKfr60tT_ljIuwmOuVWWW2NypbcvzKgScVAbRsWEYbmsjfcm2cw=w120-h120-l90-rj" className="w-16 h-16 rounded-lg" alt="songPoster" />
                                        <div className="ml-3 w-[80%]">
                                            <p className="text-lg font-semibold truncate text-ellipsis">Sunflower (Spider-Man: Into the Spider-Verse)</p>
                                            <p className="opacity-50 truncate text-ellipsis ">Post Malone & Swae Lee &#x2022; Spider-Man: Into the Spider-Verse (Soundtrack From & Inspired by the Motion Picture)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default GridSlider;
