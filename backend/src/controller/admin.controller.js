import { Song, Album } from '../models/index.js';
import cloudinary from '../lib/cloudinary.js';

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'auto',
        })
        return result.secure_url;
    } catch (error) {
        console.error(`Error while uploading file to cloudinary: ${error}`)
        throw new Error(`Error while uploading file to cloudinary: ${error}`)
    }
}

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audiFile || !req.files.imageFile) {
            return res.status(400).json({ message: "upload all the required files" });
        }
        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audiFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        })
        await song.save();
        // If album id is avaiable then update the Album with the songs
        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            });
        }
        res.status(201).json({ message: "created a song" })
    } catch (error) {
        console.error('Error while creating song: ', error);
        next(error)
    }
};

export const deleteSong = async (req, res, next) => {
    try {
        const id = req.params;
        const song = Song.findById(id);
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id }
            });
        }
        await Song.findByIdAndDelete(song._id);
        res.status(200).json({ message: `successfully deleted song with ${id}` })
    } catch (error) {
        console.error(`Error while deleting song: ${error}`);
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        if (!req.files || !req.files.imageFile) {
            res.status(400).json({ message: "Upload all the required files" })
        }
        const { title, artist, releaseYear } = req.data;
        const imageFile = req.files.imageFile;
        const imageUrl = uploadToCloudinary(imageFile);
        const album = new Album({
            title,
            artist,
            releaseYear,
            imageUrl
        })
        await album.save()
        res.status(201).json({ message: `Album with ${title} created successfully` })
    } catch (error) {
        console.error(`Error while creating album: ${error}`)
        next(error)
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const id = req.params;
        await Song.deleteMany({ albumId: id })
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: `Successfully deleted album with ${id}` });
    } catch (error) {
        console.error('Error while deleting the album');
        next(error)
    }
}

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({ admin: true })
}