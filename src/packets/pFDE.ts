import { PrismaClient } from "@prisma/client";
import { GameClient } from "../classes/game-client/GameClient";
import { SHeader } from "../structs/SHeader";
import { P_101 } from "./p101";

const prisma = new PrismaClient();

export class P_FDE {
  public numeric: string;

  public constructor(buffer: Buffer) {
    this.numeric = buffer.toString("ascii", 12, 18).replace(/[\0]+/g, "");
  }

  public validateNumeric = async (client: GameClient) => {
    const { numeric } = this;

    if (client.user.numeric === null) {
      client.user.numeric = numeric;

      await prisma.user.update({
        where: {
          username: client.user.username,
        },
        data: {
          numeric: client.user.numeric,
        },
      });

      P_101.send(client, "Senha numérica definida com sucesso!");
      return;
    } else if (client.user.numeric !== numeric) {
      client.send(new SHeader(0xfdf, 12).getBuffer());
      return;
    } else {
      P_101.send(client, "Seja bem-vindo!");
      client.state = "characters";
      client.send(new SHeader(0xfde, 12).getBuffer());
      return;
    }
  };

  public changeNumeric = async (client: GameClient) => {
    const { numeric } = this;

    client.user.numeric = numeric;

    await prisma.user.update({
      where: {
        username: client.user.username,
      },
      data: {
        numeric: client.user.numeric,
      },
    });

    P_101.send(client, "Senha numérica alterada com sucesso!");

    client.send(new SHeader(0xfde, 12).getBuffer());
  };
}
