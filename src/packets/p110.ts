// https://github.com/Rechdan/Open-WYD-Server/blob/master/Emulator/Game/Packet/Packets/P_10A.cs

import { Characters, PrismaClient } from "@prisma/client";
import { GameClient } from "../classes/game-client/GameClient";
import { SHeader } from "../structs/SHeader";

const prisma = new PrismaClient();

export class P_110 {
  public characters: Characters[];
  public count: number;
  public client: GameClient | null;
  static client: GameClient;

  public constructor() {
    this.characters = [];
    this.count = 0;
    this.client = null;
  }

  public getBuffer = async () => {
    this.characters = await prisma.characters.findMany({
      where: {
        userId: this.client?.user.id,
      },
    });

    const buffer = Buffer.alloc(756);

    new SHeader(0x110, 756, 30002).getBuffer().copy(buffer, 0, 0);

    buffer[12];

    this.characters.map((character) => {
      buffer.write(character.charname, 28 + this.count, 12, "ascii");
      this.count += 16;
    });

    this.count = 0;
    this.characters.map((character) => {
      buffer.writeInt16LE(character.level, 92 + this.count); // level
      buffer.writeUInt16LE(character.defesa, 94 + this.count); // defesa base
      buffer.writeUInt16LE(character.ataque, 96 + this.count); // ataque base
      buffer.writeUInt16LE(character.forca, 108 + this.count);
      buffer.writeUInt16LE(character.inteligencia, 110 + this.count);
      buffer.writeUInt16LE(character.destreza, 112 + this.count);
      buffer.writeUInt16LE(character.constituicao, 114 + this.count);
      buffer.writeUInt8(character.aprendizagem0, 116 + this.count);
      buffer.writeUInt8(character.aprendizagem1, 117 + this.count);
      buffer.writeUInt8(character.aprendizagem2, 118 + this.count);
      buffer.writeUInt8(character.aprendizagem3, 119 + this.count);
      this.count += 28;
    });

    this.count = 0;
    this.characters.map((character) => {
      buffer.writeUInt32LE(character.gold, 724 + this.count); // gold
      this.count += 4;
    });

    this.count = 0;
    this.characters.map((character) => {
      buffer.writeUInt32LE(character.experiencia, 740 + this.count); // xp
      this.count += 4;
    });

    return buffer;
  };

  public static send = async (client: GameClient) => {
    this.client = client;
    const buffer = new P_110().getBuffer();

    client.send(await buffer);
  };
}
