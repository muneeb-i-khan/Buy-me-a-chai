import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { PORT, mongoDBURL } from "./config";
import router from "./routes/profileRoutes";
import { Profile } from "./models/profileModel";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("Server is live");
});

app.use(cors());
app.use('/profile', router);

mongoose.connect(mongoDBURL).then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
        console.log("App has started at https://127.0.0.1:5000");
    })
}).catch((err) => {
    console.error(err);
})