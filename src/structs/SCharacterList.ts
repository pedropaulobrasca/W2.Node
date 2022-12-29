import { Characters } from "@prisma/client";
import { buffer } from "stream/consumers";

// struct
export class SCharacterList {
  // attributes
  public quantidade: number;
  public characters: Characters[];
  public startOffset: number = 0;

  public constructor(quantidade: number, characters: Characters[]) {
    this.quantidade = quantidade;
    this.characters = characters;
  }

  public getCharacterNameListBuffer = () => {
    const buffer = Buffer.alloc(64);

    this.characters.map((character) => {
      buffer.write(character.charname, this.startOffset, 12, "ascii");
      this.startOffset += 16;
    });

    return buffer;
  };
 
  public getStatusCharlistBuffer = () => {
    const buffer = Buffer.alloc(200);

    this.characters.map((character) => {
      buffer.writeInt16LE(character.level, 92 + this.startOffset - 90 - 2); // level status comeca aqui (tamanho de 27)
      buffer.writeUInt16LE(character.defesa, 94 + this.startOffset - 90 - 2); // defesa base
      buffer.writeUInt16LE(character.ataque, 96 + this.startOffset - 90 - 2); // ataque base
      buffer.writeUInt16LE(character.forca, 108 + this.startOffset - 100 - 2 + 1);
      buffer.writeUInt16LE(character.inteligencia, 110 + this.startOffset - 100 - 2 + 1);
      buffer.writeUInt16LE(character.destreza, 112 + this.startOffset - 100 - 2 + 1);
      buffer.writeUInt16LE(character.constituicao, 114 + this.startOffset - 100 - 2 + 1);
      buffer.writeUInt8(character.aprendizagem0, 116 + this.startOffset - 100 - 1 + 1);
      buffer.writeUInt8(character.aprendizagem1, 117 + this.startOffset - 100 - 1 + 1);
      buffer.writeUInt8(character.aprendizagem2, 118 + this.startOffset - 100 - 1 + 1);
      buffer.writeUInt8(character.aprendizagem3, 119 + this.startOffset - 100 - 1 + 1); // termina aqui
      this.startOffset += 27;
    });


    return buffer;
  };
}
