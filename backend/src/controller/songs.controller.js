import { Song } from "../models/index.js";

export const getAllSongs = async (req, res, next) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs)
    } catch (error) {
        next(`Error while fetching all songs: ${error}`)
    }
}

export const getFeaturedSongs = async (req, res, next) => {
    const songs = await getAggregatedSong(6, next);
    res.status(200).json(songs)
};

export const getMadeForYouSongs = async (req, res, next) => {
    const songs = await getAggregatedSong(4, next);
    res.status(200).json(songs)
};

export const getTrendingSongs = async (req, res, next) => {
    const songs = await getAggregatedSong(4, next);
    res.status(200).json(songs)
};

// Private methods 
async function getAggregatedSong(sampleSize, next) {
    try {
        const aggriagtedSongs = await Song.aggregate([
            {
                $sample: sampleSize
            },
            {
                $project: {
                    $_id: 1,
                    $title: 1,
                    $artist: 1,
                    imageUrl: 1,
                    audioUrl: 1
                }
            }
        ]);
        return aggriagtedSongs;
    } catch (error) {
        next(`Error while getting aggriagted songs: ${error}`)
    }
}