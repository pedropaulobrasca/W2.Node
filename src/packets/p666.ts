import { GameClient } from "../classes/game-client/GameClient";
import { SHeader } from "../structs/SHeader";

// Nao sei o que eh mas manda
export class P_666 {
  public constructor() {}

  public getBuffer = () => {
    const buffer = Buffer.alloc(76);

    new SHeader(0x666, 76).getBuffer().copy(buffer, 0, 0);

    return buffer;
  };

  public static send = (client: GameClient) => {
    const buffer = new P_666().getBuffer();

    client.send(buffer);
  };
}
