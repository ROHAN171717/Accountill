import express from "express";


import { getProfile, getProfilesByUser, createProfile, updateProfile, deleteProfile, getProfilesBySearch } from "../controllers/profile.js";

const router = express.Router();

router.get("/search",getProfilesBySearch);
// router.get("/",getProfiles);
router.get("/:id",getProfile);
router.get("/",getProfilesByUser);
router.post("/",createProfile);
router.patch("/:id",updateProfile);
router.delete("/:id",deleteProfile);

export default router;
