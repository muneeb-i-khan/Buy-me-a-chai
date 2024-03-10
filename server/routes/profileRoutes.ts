import express from "express";
import { Profile } from "../models/profileModel";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.username ||
            !req.body.walletAddress
        ) {
            return res.status(400).send("Please fill all the fields");
        }
        const newProfile = {
            name: req.body.name,
            username: req.body.username,
            walletAddress: req.body.walletAddress
        };
        const profile = await Profile.create(newProfile);
        return res.status(201).send(profile);
    } catch (err) {
        console.error(err);
    }

})

router.get('/', async (req,res) => {
    try {
        const profiles = await Profile.find({});
        return res.status(200).json({
            count: profiles.length,
            data: profiles
        });
    } catch(err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).send("Profile not found");
        }
        return res.status(200).send(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const profile = await Profile.findByIdAndUpdate(id, req.body);
        if (!profile) {
            return res.status(404).send("Profile not found");
        }
        return res.status(200).send(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}
);

router.delete('/:id', async (req, res) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).send("Profile not found");
        }
        return res.status(200).send(profile);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

export default router;