// https://github.com/Rechdan/Open-WYD-Server/blob/master/Emulator/Game/Packet/Packets/P_10A.cs

import { GameClient } from "../classes/game-client/GameClient";
import { SHeader } from "../structs/SHeader";

export class P_110 {
  public constructor() {}

  public getBuffer = () => {
    const buffer = Buffer.alloc(756);

    new SHeader(0x110, 756, 30002).getBuffer().copy(buffer, 0, 0);

    buffer.write("00000000", 12, "00000000".length, "ascii"); // unk1
    buffer.write("Pedro1", 28, 12, "ascii"); // char 1
    buffer.write("Pedro2", 44, 12, "ascii"); // char 2
    // buffer.write("Pedro3", 60, 12, "ascii"); // char 3
    // buffer.write("Pedro4", 76, 12, "ascii"); // char 4
    buffer.writeInt16LE(1010, 92); // level
    buffer.writeUInt16LE(594, 94); // defesa base
    buffer.writeUInt16LE(1267, 96); // ataque base
    buffer.writeUInt16LE(32, 98); // ataque base
    buffer.writeUInt16LE(1001, 108);
    buffer.writeUInt16LE(1002, 110);
    buffer.writeUInt16LE(1003, 112);
    buffer.writeUInt16LE(1004, 114);
    buffer.writeUInt8(251, 116);
    buffer.writeUInt8(252, 117);
    buffer.writeUInt8(253, 118);
    buffer.writeUInt8(254, 119);
    buffer.writeUInt32LE(2000000000, 724); // gold
    buffer.writeUInt32LE(4000000000, 740); // xp

    return buffer;
  };

  public static send = (client: GameClient) => {
    const buffer = new P_110().getBuffer();

    client.send(buffer);
  };
}
