import express from "express";
import http from "http";

export class Web {
  constructor() {}

  public init() {
    console.log("🌐 Web initialized...");

    const app = express();

    // Pega o serv00
    app.get("/serv00.txt", (_req, res) => {
      return res.type("text").send([10].join("\n"));
    });

    http
      .createServer(app)
      .on("listening", () => {
        console.log("👂 Listening http://192.168.18.11:3000/serv00.txt");
      })
      .listen(3000, "192.168.18.11");
  }
}
