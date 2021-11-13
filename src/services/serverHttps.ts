import path from "path";
import http from "http";
import cors from "cors";
import * as fs from "fs";
import https from "https";
import express from "express";
import router from "../routes/index";

class StartApp {
  private app: express.Application;
  private httpsServer: https.Server;
  private httpServer: http.Server;

  private HTTPS: string | number;
  private HTTP: string | number;

  constructor() {
    this.HTTPS = process.env.HTTPS || 443;
    this.HTTP = process.env.HTTP || 80;

    this.app = express();
    this.httpsServer = https.createServer(this.getCertificate(), this.app);
    this.httpServer = http.createServer(this.app);

    this.setCors();

    this.app.use(express.json());
  }

  private getCertificate() {
    const key = process.env.KEY
      ? path.join(__dirname, "..", process.env.KEY)
      : "/etc/letsencrypt/live/esirene.com.br-0003/privkey.pem";
    const cert = process.env.CERT
      ? path.join(__dirname, "..", process.env.CERT)
      : "/etc/letsencrypt/live/esirene.com.br-0003/cert.pem";
    const ca = process.env.CA
      ? path.join(__dirname, "..", process.env.CA)
      : "/etc/letsencrypt/live/esirene.com.br-0003/chain.pem";

    return {
      key: fs.readFileSync(key, "utf8"),
      cert: fs.readFileSync(cert, "utf8"),
      ca: fs.readFileSync(ca, "utf8"),
    };
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

    this.app.get("*", (req, res, next) => {
      req.secure
        ? next()
        : res.redirect("https://" + req.headers.host + req.url);
    });

    this.app.use("/", express.static(path.join(__dirname, "../public")));

    this.httpsServer.listen(this.HTTPS, () => {
      console.log("https running on port:", this.HTTPS);
    });

    this.httpServer.listen(this.HTTP, () => {
      console.log("http  running on port:", this.HTTP);
    });
  }
}

export default StartApp;
