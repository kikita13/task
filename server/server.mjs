import express from "express";
import cors from "cors";
import yandexRouter from "./routes/yandex.mjs";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/yandex", yandexRouter);

const PORT = 3000;

app.listen(PORT, () => console.log(`express start in ${PORT}`));
