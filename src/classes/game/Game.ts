import Net from "net";
import { GameClient } from "../game-client/GameClient";

export class Game {
  public clients: GameClient[] = [];
  public init = () => {
    console.log("🕹️  Game initialized...");

    Net.createServer()
      .on("connection", (socket) => {
        console.log("Connection");
        const client = new GameClient(socket);

        this.clients.push(client);

        socket.on("close", () => {
          const index = this.clients.findIndex((a) => a.id === client.id);

          if (index > -1) {
            console.log(`Client ${index} is closed`);
            this.clients.splice(index, 1);
          }
        });
      })
      .on("listening", () => {
        console.log("🎮 Game is running on port 8281");
      })
      .listen(8281, "192.168.18.11");
  };
}
