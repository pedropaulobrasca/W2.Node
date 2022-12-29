import { PrismaClient } from "@prisma/client";
import { GameClient } from "../classes/game-client/GameClient";
import { P_101 } from "./p101";
import { P_10E } from "./p10E";
import { P_114 } from "./p114";
import { P_666 } from "./p666";

const prisma = new PrismaClient();

export class P_213 {
  public username: string;

  public constructor(buffer: Buffer) {
    this.username = buffer.toString("ascii", 12, 23).replace(/[\0]+/g, "");
  }

  public controller = async (client: GameClient) => {
    const { username } = this;

    P_666.send(client);
    P_114.send(client);
  };
}
