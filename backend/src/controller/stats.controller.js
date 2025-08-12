import { Song, User, Album } from '../models/index.js';

export const getStats = async (req, res, next) => {
    try {
        const { totalSongs, totalUsers, totalAlbums, uniqueArtist } = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),
            Song.aggregate([
                {
                    $unionWith: {
                        coll: "albums",
                        pipeline: []
                    }
                },
                {
                    $group: {
                        _id: "$artist",
                    }
                },
                {
                    $count: "count"
                }
            ])
        ]);

        res.status(200).json({
            totalAlbums,
            totalSongs,
            totalUsers,
            totalArtists: uniqueArtist ?? 0
        })
    } catch (error) {
        next(`Error while fetching stats: ${error}`)
    }
};
