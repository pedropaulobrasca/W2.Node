import { PrismaClient } from "@prisma/client";
import { GameClient } from "../classes/game-client/GameClient";
import { P_101 } from "./p101";
import { P_10E } from "./p10E";

const prisma = new PrismaClient();

export class P_20D {
  public username: string;
  public password: string;

  public constructor(buffer: Buffer) {
    this.username = buffer.toString("ascii", 12, 23).replace(/[\0]+/g, "");
    this.password = buffer.toString("ascii", 28, 38).replace(/[\0]+/g, "");
  }

  public controller = async (client: GameClient) => {
    const { username, password } = this;

    const user = await prisma.user.upsert({
      where: {
        username,
      },
      update: {},
      create: {
        username,
        password,
      },
    });

    if (password !== user.password) {
      return P_101.send(client, "Senha inválida!");
    }

    client.state = "password";
    client.user = user;

    P_101.send(client, "Login");
    P_10E.send(client);
  };
}
