import Net from "net";
import Crypto from "crypto";
import { packetSecurity } from "../packet-security/PacketSecurity";
import { packet } from "../packet/Packet";
import { Characters, User } from "@prisma/client";

export class GameClient {
  private socket: Net.Socket;
  public id: string;
  public state: "connection" | "login" | "password" | "characters" | "game" =
    "connection";

  public user!: User;

  public selectedCharacter!: Characters;

  public constructor(socket: Net.Socket) {
    this.socket = socket;
    this.id = Crypto.randomBytes(10).toString("hex");
    this.socket.on("data", this.onDataReceived);
  }

  private onDataReceived = (buffer: Buffer) => {
    if (this.state === "connection") {
      if (buffer.length === 4 || buffer.length === 120) {
        this.state = "login";

        if (buffer.length === 120) {
          this.onDataReceived(buffer.slice(4));
        }
      } else {
        this.close();
      }
    } else {
      packetSecurity.decrypt(buffer);
      packet.controller(this, buffer);
    }
  };

  public send(buffer: Buffer) {
    packetSecurity.encrypt(buffer);
    this.socket.write(buffer);
  }

  public close() {
    this.socket.destroy();
  }
}
