// index.js
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";
import propertyRouter from "./routes/property.routes.js";

dotenv.config();

const app = express();

app.use(cors( 
  {
    origin: process.env.CLIENT_URL,
    credentials: true,
}
));

app.use(express.json({ limit: "50mb" }));



app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(process.env.PORT, () =>
      console.log("Server started on http://localhost:8080"),
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
