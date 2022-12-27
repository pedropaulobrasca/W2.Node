// classes
// packets

import { P_101 } from "../../packets/p101";
import { P_20D } from "../../packets/p20D";
import { P_20F } from "../../packets/p20F";
import { P_213 } from "../../packets/p213";
import { P_FDE } from "../../packets/pFDE";
import { GameClient } from "../game-client/GameClient";

export const packet = new (class {
  public controller = (client: GameClient, buffer: Buffer) => {
    const pakcetID = buffer.readUInt16LE(4);

    switch (client.state) {
      case "login":
        switch (pakcetID) {
          case 0x20d:
            new P_20D(buffer).controller(client);
            break;

          default:
            client.close();
            break;
        }
        break;

      case "password":
        switch (pakcetID) {
          case 0xfde:
            new P_FDE(buffer).validateNumeric(client);
            break;

          default:
            console.log("unk:", pakcetID.toString(16));
            break;
        }
        break;

      case "characters":
        switch (pakcetID) {
          case 0xfde:
            new P_FDE(buffer).changeNumeric(client);
            break;

          case 0x20f:
            new P_20F(buffer).controller(client);
            break;

          case 0x213:
            new P_213(buffer).controller(client);
            break;

          default:
            console.log("unk:", pakcetID.toString(16));
            break;
        }
        break;

      case "game":
        break;
    }
  };
})();
