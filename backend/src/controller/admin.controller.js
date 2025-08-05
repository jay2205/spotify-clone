import { Song } from '../models/song.model.js'
import { }
export const createSong = async (req, res) => {
    try {
        if (!req.files || !req.files.audiFile || !req.files.imageFile) {
            return res.status(400).json({ message: "upload all the required files" });
        }
        const { title, artist, albumID, duration } = req.body;
        const audiFile = req.files.audiFile;
        const imageFile = req.files.imageFile;

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumID: albumID || null
        })

        await song.save();

        if (albumID) {
            await alb
        }

    } catch (error) {
        console.error('Error while creating song: ', error);
        res.status(500).json({ message: `Error while creating song: ${error}` })
    }
}