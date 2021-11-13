import path from "path";
import http from "http";
import cors from "cors";
import express from "express";
import router from "../routes/index";

class StartApp {
  private app: express.Application;
  private httpServer: http.Server;

  private HTTP: string | number;

  constructor() {
    this.HTTP = 4040;

    this.app = express();
    this.httpServer = http.createServer(this.app);

    this.setCors();

    this.app.use(express.json());
  }


  setCors() {
    // Habilita o CORS
    const options: cors.CorsOptions = {
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
        "Authorization"
      ],
      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: "*",
      preflightContinue: false,
    };

    this.app.use(cors(options));
  }

  listen() {
    this.app.use("/", router);

    this.app.use("/", express.static(path.join(__dirname, "../public")));

    this.httpServer.listen(this.HTTP, () => {
      console.log("http  running on port:", this.HTTP);
    });
  }
}

export default StartApp;
