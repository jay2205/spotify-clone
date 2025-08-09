import { Router } from "express";
import { getAlbum, getAlbumById } from "../controller/album.controller.js";
const router = Router();

router.get('/', getAlbum);
router.get('/:albumId', getAlbumById);

export default router;