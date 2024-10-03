  class DES {
  constructor() {
    this.PC1 = [
      57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43,
      35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54,
      46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
    ];
    this.PC2 = [
      14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7,
      27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39,
      56, 34, 53, 46, 42, 50, 36, 29, 32,
    ];
    this.IP = [
      //intial permute
      58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46,
      38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17,
      9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63,
      55, 47, 39, 31, 23, 15, 7,
    ];
    this.E = [
      //expansionTable
      32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15,
      16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27,
      28, 29, 28, 29, 30, 31, 32, 1,
    ];
    this.S = [
      //S-box
      [
        14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7, 0, 15, 7, 4, 14,
        2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8, 4, 1, 14, 8, 13, 6, 2, 11, 15, 12,
        9, 7, 3, 10, 5, 0, 15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13,
      ],
      [
        15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10, 3, 13, 4, 7, 15,
        2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5, 0, 14, 7, 11, 10, 4, 13, 1, 5, 8,
        12, 6, 9, 3, 2, 15, 13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14,
        9,
      ],
      [
        10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8, 13, 7, 0, 9, 3, 4,
        6, 10, 2, 8, 5, 14, 12, 11, 15, 1, 13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2,
        12, 5, 10, 14, 7, 1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12,
      ],
      [
        7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15, 13, 8, 11, 5, 6,
        15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9, 10, 6, 9, 0, 12, 11, 7, 13, 15, 1,
        3, 14, 5, 2, 8, 4, 3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14,
      ],
      [
        2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9, 14, 11, 2, 12, 4,
        7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6, 4, 2, 1, 11, 10, 13, 7, 8, 15, 9,
        12, 5, 6, 3, 0, 14, 11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5,
        3,
      ],
      [
        12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11, 10, 15, 4, 2, 7,
        12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8, 9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4,
        10, 1, 13, 11, 6, 4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13,
      ],
      [
        4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1, 13, 0, 11, 7, 4,
        9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6, 1, 4, 11, 13, 12, 3, 7, 14, 10, 15,
        6, 8, 0, 5, 9, 2, 6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12,
      ],
      [
        13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7, 1, 15, 13, 8, 10,
        3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2, 7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10,
        13, 15, 3, 5, 8, 2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11,
      ],
    ];
    this.P = [
      16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14,
      32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
    ];
    this.FINAL_IP = [
      40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46,
      14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20,
      60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33,
      1, 41, 9, 49, 17, 57, 25,
    ];
    this.NUM_OF_LEFT_SHIFTS = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
    this.encodeString = "";
  }

  //helpers
  chunkString = (str, len) => str.match(new RegExp(".{1," + len + "}", "g"));
  hexToBin = (hex) => ("00000000" + parseInt(hex, 16).toString(2)).slice(-8);
  decToBin = (dec) => ("0000" + parseInt(dec, 10).toString(2)).slice(-4);
  binToHex = (bin) => parseInt(bin, 2).toString(16);
  bin = (key) =>
    this.chunkString(key, 2)
      .map((hex) => this.hexToBin(hex))
      .join("");
  shiftString = (str, shift) =>
    str.slice(shift, str.length) + str.slice(0, shift);

  bin2Hex(bin) {
    // Chuyển đổi chuỗi nhị phân sang số nguyên
    let decimal = parseInt(bin, 2);
    // Chuyển đổi số nguyên sang chuỗi thập lục phân
    let hex = decimal.toString(16).toUpperCase();
    return hex;
  }

  stringToHex(str) {
    // Chuyển đổi từng ký tự trong chuỗi thành mã hex
    return str
      .split("")
      .map((char) => char.charCodeAt(0).toString(16))
      .join("");
  }

  hexToString(hex) {
    // Chuyển đổi từng cặp ký tự hex thành ký tự tương ứng
    let str = "";
    for (let i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
    }
    return str;
  }

  removeTrailingAtSymbols = (str) => {
    // Kiểm tra nếu ký tự cuối cùng là @ và loại bỏ nó
    while (str.endsWith('@')) {
      str = str.slice(0, -1);
    }
    return str;
  };

  //subkey generate
  keySchedule = (key) => {
    key = this.bin(this.stringToHex(key));
    let subkeys = [];
    let perm = this.PC1.map((index) => key[index - 1]).join("");
    let C0 = perm.slice(0, perm.length / 2);
    let D0 = perm.slice(perm.length / 2);
    let prevC0 = C0,
      prevD0 = D0;
      this.NUM_OF_LEFT_SHIFTS.forEach((shift, i) => {
      C0 = this.shiftString(prevC0, shift);
      D0 = this.shiftString(prevD0, shift);
      prevC0 = C0;
      prevD0 = D0;
      let pair = C0 + D0;
      subkeys.push(this.PC2.map((index) => pair[index - 1]).join(""));
    });

    return subkeys;
  };

  expandBlock = (block) => this.E.map((index) => block[index - 1]).join("");

  stringXOR = (str1, str2, len) => {
    let xor = Array(len);
    for (let i = 0; i < len; i++) {
      xor[i] = str1[i] === str2[i] ? 0 : 1;
    }
    return xor.join("");
  };

  sBoxOutput = (bits) => {
    return this.chunkString(bits, 6)
      .map((group, sBox) => {
        let row = parseInt(group[0] + group[5], 2);
        let col = parseInt(group.slice(1, 5), 2);
        return this.decToBin(this.S[sBox][16 * row + col]);
      })
      .join("");
  };

  des = (msg, key, subkeys) => {
    msg = this.bin(msg);

    let perm = this.IP.map((index) => msg[index - 1]).join(""); // init permute (IP)
    let L0 = perm.slice(0, perm.length / 2);
    let R0 = perm.slice(perm.length / 2);

    let prevL0 = L0,
      prevR0 = R0;
    for (let i = 0; i < 16; i++) {
      L0 = prevR0;
      let sBoxOut = this.sBoxOutput(
        this.stringXOR(subkeys[i], this.expandBlock(R0), 48)
      );
      let finalPerm = this.P.map((index) => sBoxOut[index - 1]).join("");
      R0 = this.stringXOR(prevL0, finalPerm, 32);
      prevL0 = L0;
      prevR0 = R0;
    }
    let pair = R0 + L0;
    let enc = this.FINAL_IP.map((index) => pair[index - 1]).join("");
    return this.chunkString(enc, 4).map(this.binToHex).join("").toUpperCase();
  };
  //implement
  encode = (msg, key) => this.des(this.stringToHex(msg), key, this.keySchedule(key));
  decode = (msg, key) => this.des(msg, key, this.keySchedule(key).reverse());

  runEncrypt = (plaintext, key) => {
    this.encodeString = "";

    // Duyệt qua chuỗi với bước nhảy là 8
    for (let i = 0; i < plaintext.length; i += 8) {
      // Lấy ra 1 khối gồm 8 ký tự
      let block = plaintext.slice(i, i + 8);
      if (block.length < 8) {
        while (block.length < 8) {
            block += '@';  // Thêm padding bằng ký tự null
        }
    }
    // console.log(block);
    
    this.encodeString+=this.encode(block,key);
    }

    return this.encodeString;
    
  };
  

  runDecrypt = (ciphertext,key) => {

    let decodeArray = []

    let decodeResultString = ""

    for (let i = 0; i < ciphertext.length; i += 16){
      let hexBlock = ciphertext.slice(i, i + 16);
      decodeArray.push(this.decode(hexBlock,key));
      
    }
    // console.log(decodeArray);
    
    decodeArray.forEach((hexBlock)=>{
      let stringBlock = this.hexToString(hexBlock);
      stringBlock = this.removeTrailingAtSymbols(stringBlock);
      decodeResultString+= stringBlock;
    })
    return decodeResultString;
  }
  
}

let key = "password";
let plaintext = "haiminh454vazy123"; 
let uncorrectKey = "vazy4543"

const des = new DES();

const encryptedCode = des.runEncrypt(plaintext,key);
const decryptedCode = des.runDecrypt(encryptedCode,key);
const uncorrectDecryptedCode = des.runDecrypt(encryptedCode,uncorrectKey);

console.log(`plaintext: ${plaintext}`);
console.log(`correct key: ${key}`);

console.log(`Mã hóa: ${encryptedCode}`);
console.log(`Giải mã khia key đúng: ${decryptedCode}`);
console.log(`Giải mã khia key sai: ${uncorrectDecryptedCode}`);



