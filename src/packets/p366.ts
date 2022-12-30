import { PrismaClient } from "@prisma/client";
import { GameClient } from "../classes/game-client/GameClient";
import { SHeader } from "../structs/SHeader";

const prisma = new PrismaClient();

export class P_366 {
  public oldX: number;
  public oldY: number;
  public newX: number;
  public newY: number;

  public constructor(buffer?: Buffer) {
    this.oldX = Number(buffer?.readInt16LE(12));
    this.oldY = Number(buffer?.readInt16LE(14));
    this.newX = Number(buffer?.readInt16LE(24));
    this.newY = Number(buffer?.readInt16LE(26));
  }

  public controller = async (client: GameClient) => {
    // enviar as coords
    console.log(false);
    // P_366.send(client);
  };

  public getBuffer = async (client: GameClient) => {
    // recebe
    const buffer = Buffer.alloc(52);

    new SHeader(0x366, 52, 30002).getBuffer().copy(buffer, 0, 0);

    buffer.writeInt16LE(2100, 12); // x
    buffer.writeInt16LE(2100, 14); // y

    return buffer;
  };

  public static send = async (client: GameClient) => {
    const buffer = new P_366().getBuffer(client);

    client.send(await buffer);
  };
}
