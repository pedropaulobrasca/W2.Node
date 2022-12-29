// https://github.com/Rechdan/Open-WYD-Server/blob/master/Emulator/Game/Packet/Packets/P_10A.cs

import { GameClient } from "../classes/game-client/GameClient";
import { SHeader } from "../structs/SHeader";
import { Characters, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class P_10E {
  public characters: Characters[];

  public constructor() {
    this.characters = [];
  }

  public getBuffer = async (client: GameClient) => {
    this.characters = await prisma.characters.findMany({
      where: {
        userId: client.user.id,
      },
    });
    const buffer = Buffer.alloc(1816);

    new SHeader(0x10e, 1816, 30002).getBuffer().copy(buffer, 0, 0);

    buffer.write("00000000", 12, "00000000".length, "ascii"); // unk1
    buffer.write(this.characters[0].charname, 28, 12, "ascii"); // char 1
    // buffer.write("Pedro2", 44, 12, "ascii"); // char 2
    // buffer.write("Pedro3", 60, 12, "ascii"); // char 3
    // buffer.write("Pedro4", 76, 12, "ascii"); // char 4
    buffer.writeInt16LE(this.characters[0].level, 92); // level
    buffer.writeUInt16LE(this.characters[0].defesa, 94); // defesa base
    buffer.writeUInt16LE(this.characters[0].ataque, 96); // ataque base
    // buffer.writeUInt16LE(32, 98); // ataque base
    buffer.writeUInt16LE(this.characters[0].forca, 108);
    buffer.writeUInt16LE(this.characters[0].inteligencia, 110);
    buffer.writeUInt16LE(this.characters[0].destreza, 112);
    buffer.writeUInt16LE(this.characters[0].constituicao, 114);
    buffer.writeUInt8(this.characters[0].aprendizagem0, 116);
    buffer.writeUInt8(this.characters[0].aprendizagem1, 117);
    buffer.writeUInt8(this.characters[0].aprendizagem2, 118);
    buffer.writeUInt8(this.characters[0].aprendizagem3, 119);
    buffer.writeUInt32LE(this.characters[0].gold, 724); // gold
    buffer.writeUInt32LE(this.characters[0].experiencia, 740); // xp
    return buffer;
  };

  public static send = async (client: GameClient) => {
    const buffer = new P_10E().getBuffer(client);

    client.send(await buffer);
  };
}
