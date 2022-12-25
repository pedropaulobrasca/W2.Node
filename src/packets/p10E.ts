// https://github.com/Rechdan/Open-WYD-Server/blob/master/Emulator/Game/Packet/Packets/P_10A.cs

import { GameClient } from "../classes/game-client/GameClient";
import { SHeader } from "../structs/SHeader";


export class P_10E {
  public constructor() {}

  public getBuffer = () => {
    const buffer = Buffer.alloc(1816);

    new SHeader(0x10e, 1816, 30002).getBuffer().copy(buffer, 0, 0);

    return buffer;
  };

  public static send = (client: GameClient) => {
    const buffer = new P_10E().getBuffer();

    client.send(buffer);
  };
}
