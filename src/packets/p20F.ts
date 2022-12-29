import { Characters, PrismaClient } from "@prisma/client";
import { GameClient } from "../classes/game-client/GameClient";
import { P_101 } from "./p101";
import { P_110 } from "./p110";

const prisma = new PrismaClient();

export class P_20F {
  public charname: string;
  public race: number;
  private character: Characters | null;

  constructor(buffer: Buffer) {
    this.charname = buffer.toString("ascii", 16, 27).replace(/[\0]+/g, "");
    this.race = Number(buffer.toString("hex", 32, 33));
    this.character = null;
  }

  public controller = async (client: GameClient) => {
    const { charname, race } = this;

    this.character = await prisma.characters.findUnique({
      where: {
        charname,
      },
    });

    if (!this.character) {
      this.character = await prisma.characters.create({
        data: {
          charname,
          race,
          userId: client.user.id,
        },
      });

      P_101.send(
        client,
        `Personagem ${this.character?.charname} criado com sucesso!`
      );

      P_110.send(client);
    } else {
      P_101.send(
        client,
        `Personagem ${this.character?.charname} já existente.`
      );
    }
  };
}
