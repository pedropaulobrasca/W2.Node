// https://github.com/Rechdan/Open-WYD-Server/blob/master/Emulator/Game/Packet/Packets/P_10A.cs

import { GameClient } from "../classes/game-client/GameClient";
import { SHeader } from "../structs/SHeader";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class P_114 {
  public constructor() {}

  public getBuffer = async (client: GameClient) => {
    const buffer = Buffer.alloc(1244);

    new SHeader(0x114, 1244, 30002).getBuffer().copy(buffer, 0, 0);

    buffer.writeInt16LE(2100, 12); // x
    buffer.writeInt16LE(2100, 14); // y
    buffer.write(client.selectedCharacter.charname, 16, 17); // nome
    buffer.writeInt16LE(0, 33); // direcao
    buffer.writeInt16LE(3, 35); //
    buffer.writeInt16LE(64, 37); //

    buffer.writeInt16LE(2000, 88); // max life
    buffer.writeInt16LE(4000, 90); // max mana
    buffer.writeInt16LE(1999, 92); // atual life
    buffer.writeInt16LE(3999, 94); // atual mana


    buffer.writeInt8(client.selectedCharacter.race, 108); // classe
    buffer.writeInt16LE(client.selectedCharacter.level, 52); // level

    return buffer;
  };

  public static send = async (client: GameClient) => {
    const buffer = new P_114().getBuffer(client);

    client.send(await buffer);
  };
}
