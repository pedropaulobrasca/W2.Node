// https://github.com/Rechdan/Open-WYD-Server/blob/master/Emulator/Game/Packet/Packets/P_10A.cs

import { GameClient } from "../classes/game-client/GameClient";
import { SHeader } from "../structs/SHeader";

export class P_114 {
  public constructor() {}

  public getBuffer = () => {
    const buffer = Buffer.alloc(1244);

    new SHeader(0x114, 1244, 30002).getBuffer().copy(buffer, 0, 0);

    buffer.writeInt16LE(2100, 12); // x
    buffer.writeInt16LE(2100, 14); // y
    buffer.write("Pedro1", 16, 17); // nome
    buffer.writeInt8(24, 33); // direcao
    buffer.writeInt16LE(1010, 52); // level

    return buffer;
  };

  public static send = (client: GameClient) => {
    const buffer = new P_114().getBuffer();

    client.send(buffer);
  };
}
