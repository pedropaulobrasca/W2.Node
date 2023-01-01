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

    buffer.writeInt16LE(2200, 12); // x
    buffer.writeInt16LE(2100, 14); // y
    buffer.write(client.selectedCharacter.charname, 16, 16); //
    buffer.writeInt16LE(24, 33); //
    buffer.writeUInt8(0, 35); //
    buffer.writeUInt8(1, 36); //
    buffer.writeInt16LE(64, 37); //
    buffer.writeUint32LE(client.selectedCharacter.gold, 40); // GOLD
    buffer.writeUint32LE(client.selectedCharacter.experiencia, 44); // XP
    buffer.writeInt16LE(2097, 48); //
    buffer.writeInt16LE(2096, 50); //
    buffer.writeInt16LE(client.selectedCharacter.level, 52); // level
    buffer.writeInt16LE(1014, 54); //
    buffer.writeInt16LE(999, 56); //
    buffer.writeInt16LE(20992, 58); //
    buffer.writeInt16LE(2453, 60); //
    buffer.writeInt16LE(1626, 62); //
    buffer.writeInt16LE(1992, 64); //
    buffer.writeInt16LE(1069, 66); //
    buffer.writeInt16LE(289, 68); //
    buffer.writeInt16LE(287, 70); //
    buffer.writeInt16LE(86, 72); //
    buffer.writeInt16LE(185, 74); //
    buffer.writeInt16LE(259, 76); //
    buffer.writeInt16LE(257, 78); //
    buffer.writeInt16LE(1010, 80); //
    buffer.writeInt16LE(594, 82); // defesa
    buffer.writeInt16LE(2435, 84); // ataque

    buffer.writeInt16LE(2000, 88); // max life
    buffer.writeInt16LE(4000, 90); // max mana
    buffer.writeInt16LE(1999, 92); // atual life
    buffer.writeInt16LE(3999, 94); // atual mana

    buffer.writeUint16LE(289, 96); // forca
    buffer.writeUint16LE(287, 98); // inteligencia
    buffer.writeUint16LE(86, 100); // destreza
    buffer.writeUint16LE(185, 102); // constituicao

    buffer.writeUInt8(client.selectedCharacter.aprendizagem0, 104); // aprendizagem1
    buffer.writeUInt8(client.selectedCharacter.aprendizagem1, 105); // aprendizagem2
    buffer.writeUInt8(client.selectedCharacter.aprendizagem2, 106); // aprendizagem3
    buffer.writeUInt8(client.selectedCharacter.aprendizagem3, 107); // aprendizagem4

    buffer.writeInt8(client.selectedCharacter.race, 108); // classe

    buffer.writeUint16LE(1551, 116); // acho que comeca os equips --- acaba em 235 cada item tem 8 bytes ( 256 bytes )

    buffer.writeUint16LE(682, 236); // inventario kit cura 20 ---- termina em 739
    // o item id tem 2 bytes e 6 bytes para efeitos sendo 1 byte para o efeito e 1 byte para o valor
    // ( -36 da differenca com o packet do open wyd )

    buffer.writeUint16LE(132, 736); // Item 547
    buffer.writeUInt8(132, 738); // CP
    buffer.writeUInt8(132, 739); // Current kill

    buffer.writeBigUInt64LE(BigInt(4300013568), 744); // Learn

    buffer.writeUint16LE(9881, 752); // StatusPoint
    buffer.writeUint16LE(2014, 754); // MasterPoint
    buffer.writeUint16LE(3164, 756); // SkillPoint

    buffer.writeUInt8(240, 758); // Critical
    buffer.writeUInt8(240, 759); // Save mana

    buffer.writeUInt8(240, 760); // SkillBar1
    buffer.writeUInt8(240, 761); // SkillBar1
    buffer.writeUInt8(240, 762); // SkillBar1
    buffer.writeUInt8(240, 763); // SkillBar1

    buffer.writeUint16LE(1792, 764); //
    buffer.writeUint16LE(2816, 766); //

    buffer.writeUInt8(132, 768); // Fogo
    buffer.writeUInt8(133, 769); // gelo
    buffer.writeUInt8(134, 770); // sagrado
    buffer.writeUInt8(135, 771); // trovao

    buffer.writeUint16LE(65535, 782); //

    buffer.writeUint16LE(client.user.id, 990); //
    buffer.writeUint16LE(1, 992); //

    buffer.writeUInt8(241, 994); //

    buffer.writeUint16LE(2816, 1012); //

    buffer.write("Teste tab", 1016, 26, "ascii"); //

    return buffer;
  };

  public static send = async (client: GameClient) => {
    const buffer = new P_114().getBuffer(client);

    client.send(await buffer);
  };
}
