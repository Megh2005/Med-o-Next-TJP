import { app } from "./app.js";
import connectDB from "./db/index.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error(`Error starting app: ${error}`);
      process.exit(1);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection failed: ${error}`);
  });
