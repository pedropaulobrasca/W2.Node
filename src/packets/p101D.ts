import { GameClient } from "../classes/game-client/GameClient";
import { Header } from "../structs/Header";

export class P_101 {
  public message: string;

  public constructor(message: string) {
    this.message = message;
  }

  public getBuffer = () => {
    const buffer = Buffer.alloc(108);

    new Header(0x101, 108).getBuffer().copy(buffer, 0, 0);

    buffer.write(this.message, 12, this.message.length, "ascii");

    return buffer;
  };

  public static send = (client: GameClient, message: string) => {
    const buffer = new P_101(message).getBuffer();

    client.send(buffer);
  };
}
