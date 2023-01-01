import { PrismaClient } from "@prisma/client";
import { buffer } from "stream/consumers";
import { GameClient } from "../classes/game-client/GameClient";
import { P_114 } from "./p114";
import { P_364 } from "./p364";
import { P_666 } from "./p666";

const prisma = new PrismaClient();

export class P_213 {
  public selectedChar!: number;

  public constructor(buffer: Buffer) {
    this.selectedChar = buffer[12];
  }

  public controller = async (client: GameClient) => {
    // pega os chars do user
    const userCharacters = await prisma.characters.findMany({
      where: {
        user: client.user,
      },
    });

    client.selectedCharacter = userCharacters[this.selectedChar];
    client.state = "game";
    P_666.send(client);
    await P_114.send(client);
    // P_364.send(client);
  };
}
