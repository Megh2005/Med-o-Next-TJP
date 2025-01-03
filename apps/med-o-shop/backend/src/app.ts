import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({ origin: "https://med-o-shop-1.onrender.com", credentials: true })
);

app.use(
  express.json({
    limit: "32kb",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
import errorHandler from "./utils/errorHandler";
import mainRouter from "./routes/mainRouter";

app.use("/api/v1", mainRouter);

app.use(errorHandler);

export { app };
