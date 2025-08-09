import { Album } from "../models/index.js";

export const getAlbum = async (req, res, next) => {
    try {
        const albums = await Album.find();
        return res.status(200).json(albums)
    } catch (error) {
        next(`Error while getting albums: ${error}`);
    }
}

export const getAlbumById = async (req, res, next) => {
    try {
        const { albumId } = req.params;
        const album = await Album.findById(albumId).populate('songs');
        if (!album) {
            return res.status(404).json({ message: `No album found with id ${albumId}` })
        }
        return res.status(200).json(album)
    } catch (error) {
        next(`Error while fetchin album with Id: ${error}`)
    }
}