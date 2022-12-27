// https://github.com/Rechdan/Open-WYD-Server/blob/master/Emulator/Game/Packet/Packets/P_10A.cs

import { GameClient } from "../classes/game-client/GameClient";
import { SHeader } from "../structs/SHeader";

export class P_10E {
  public constructor() {}

  public getBuffer = () => {
    const buffer = Buffer.alloc(1816);

    new SHeader(0x10e, 1816, 30002).getBuffer().copy(buffer, 0, 0);

    buffer.write("00000000", 12, "00000000".length, "ascii");
    buffer.write("Pedro1", 28, 12, "ascii");
    buffer.write("Pedro2", 44, 12, "ascii");
    buffer.write("Pedro3", 60, 12, "ascii");
    buffer.write("Pedro4", 76, 12, "ascii");
    buffer.writeInt16LE(1010, 92);
    buffer.writeUInt8(27, 94)
    buffer.writeUInt8(1, 95)
    buffer.writeUInt8(2, 96)
    buffer.writeUInt8(2, 97)
    buffer.writeUInt16LE(1001, 108)
    buffer.writeUInt16LE(1002, 110)
    buffer.writeUInt16LE(1003, 112)
    buffer.writeUInt16LE(1004, 114)
    buffer.writeUInt8(251, 116)
    buffer.writeUInt8(252, 117)
    buffer.writeUInt8(253, 118)
    buffer.writeUInt8(254, 119)
    return buffer;
  };

  public static send = (client: GameClient) => {
    const buffer = new P_10E().getBuffer();

    client.send(buffer);
  };
}
