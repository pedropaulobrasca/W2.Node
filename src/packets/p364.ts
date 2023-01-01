import { GameClient } from "../classes/game-client/GameClient";
import { SHeader } from "../structs/SHeader";

// Nao sei o que eh mas manda
export class P_364 {
  public constructor() {}

  public getBuffer = (client: GameClient) => {
    const buffer = Buffer.alloc(176);

    new SHeader(0x364, 176).getBuffer().copy(buffer, 0, 0);

    buffer.writeInt16LE(2100, 12); // x
    buffer.writeInt16LE(2100, 14); // y
    buffer.writeInt16LE(client.user.id, 16); // y
    buffer.write(client.selectedCharacter.charname, 18, 12); // nome
    buffer.writeUInt8(147, 30); // y
    buffer.writeUInt8(204, 31); // y
    buffer.writeUInt8(31, 34); // y

    return buffer;
  };

  public static send = (client: GameClient) => {
    const buffer = new P_364().getBuffer(client);

    client.send(buffer);
  };
}
