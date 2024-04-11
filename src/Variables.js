import { atom } from "jotai";

export const HomeAtom = atom({
    background: "",
    data: [],
    headers: [],
});

export const PlayAtom = atom(false);
export const TimeAtom = atom(0);
export const VolumeAtom = atom(50);
export const BackgroundAtom = atom("");
export const CurrentVideoIDAtom = atom("");
export const CurrentPlaylistIDAtom = atom("");

export const PlayerAtom = atom({
    author: "",
    channelId: "",
    duration: "",
    keywords: [],
    shortDescription: "",
    streams: [],
    subTitle: "",
    thumbnail: "",
    title: "",
    type: "",
    videoId: "",
    viewCount: "",
});
