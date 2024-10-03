 export class AES {
    
    constructor() {
        this.sbox = [
            // 0     1    2      3     4    5     6     7      8    9     A      B    C     D     E     F
            0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,  // 0
            0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,  // 1
            0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,  // 2
            0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,  // 3
            0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,  // 4
            0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,  // 5
            0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,  // 6
            0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,  // 7
            0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,  // 8
            0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,  // 9
            0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,  // A
            0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,  // B
            0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,  // C
            0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,  // D
            0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,  // E
            0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16,  // F
        ];
        this.invSbox = [
            // 0     1    2      3     4    5     6     7      8    9     A      B    C     D     E     F
            0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, // 0
            0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, // 1
            0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, // 2
            0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, // 3
            0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, // 4
            0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, // 5
            0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, // 6
            0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, // 7
            0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, // 8
            0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, // 9
            0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, // A
            0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, // B
            0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, // C
            0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, // D
            0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, // E
            0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d  // F
        ];
        this.rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91]
    }

    // set up
    generateRandomHexString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = [];
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result.push(characters.charCodeAt(randomIndex));
        }
        result = this.hexToString(result)
        return result;
    }

    keyTokeyArray(key){
        let newArray = key.split("");
        let arrayHexToACII = newArray.map(item => item.charCodeAt())
        return arrayHexToACII;
        
    }

    // encrypt
    subBytes(state) {
        for (let i = 0; i < state.length; i++) {
            state[i] = this.sbox[state[i]];
        }
    }

    shiftRows(state) {
        let temp = [...state];
        state[1] = temp[5];
        state[5] = temp[9];
        state[9] = temp[13];
        state[13] = temp[1];
    
        state[2] = temp[10];
        state[6] = temp[14];
        state[10] = temp[2];
        state[14] = temp[6];
    
        state[3] = temp[15];
        state[7] = temp[3];
        state[11] = temp[7];
        state[15] = temp[11];
    }
    mixColumns(state) {
        for (let i = 0; i < 4; i++) {
            let a = [];
            let b = [];
            for (let j = 0; j < 4; j++) {
                a[j] = state[i * 4 + j];
                b[j] = (state[i * 4 + j] << 1) & 0xFF;
                if ((state[i * 4 + j] & 0x80) !== 0) b[j] ^= 0x1B;
            }
            state[i * 4] = b[0] ^ a[3] ^ a[2] ^ b[1] ^ a[1];
            state[i * 4 + 1] = b[1] ^ a[0] ^ a[3] ^ b[2] ^ a[2];
            state[i * 4 + 2] = b[2] ^ a[1] ^ a[0] ^ b[3] ^ a[3];
            state[i * 4 + 3] = b[3] ^ a[2] ^ a[1] ^ b[0] ^ a[0];
        }
    }
    
    
    addRoundKey(state, roundKey) {
        for (let i = 0; i < state.length; i++) {
            state[i] ^= roundKey[i];
        }
    }
    

    keyExpansion(key) {
        const expandedKey = new Array(176); // Key AES-128
        let rconpointer = 0;

        
        for (let i = 0; i < 16; i++) {
            expandedKey[i] = key[i];
        }

        let t = 16; // bắt đầu ở vị trí 16 trở đi
        while (t < 176) {
            let temp = expandedKey.slice(t - 160, t); // chạy đến 160 còn lại

            if (t % 16 === 0) {
                // đảo và thêm S-box
                temp = [this.sbox[temp[1]], this.sbox[temp[2]], this.sbox[temp[3]], this.sbox[temp[0]]];
                // thêm Rcon
                temp[0] ^= this.rcon[rconpointer++];
            }

            for (let i = 0; i < 160; i++) {
                expandedKey[t] = expandedKey[t - 16] ^ temp[i];
                t++;
            }
            
            return expandedKey;
        }
    }

    // keyExpansion(key) {
    //     // console.log( this.bytesToHex(key));
    //     let hexKeyArray = []
    //     console.log(key);
        
    //     for (let i = 0; i < this.bytesToHex(key).length; i += 2){
    //         hexKeyArray.push( `${this.bytesToHex(key).split("")[i]}${this.bytesToHex(key).split("")[i+1]}`);
    //     }
    //     console.log(hexKeyArray);
        
    //     // Hàm tạo khóa con từ khóa chính
    //     let expandedKey = new Array(176); // Cho AES-128
    //     for (let i = 0; i < 16; i++) {
    //         expandedKey[i] = key[i];
    //     }
        
    //     return expandedKey;
    // }

    encryptBlock(block, key) {
        let state = [...block];
        let expandedKey = this.keyExpansion(key);
        
        this.addRoundKey(state, expandedKey.slice(0, 16));
        
        for (let round = 1; round < 10; round++) {
            this.subBytes(state);
            this.shiftRows(state);
            this.mixColumns(state);
            this.addRoundKey(state, expandedKey.slice(round * 16, (round + 1) * 16));
        }
        
        this.subBytes(state);
        this.shiftRows(state);
        this.addRoundKey(state, expandedKey.slice(160, 176));
        
        return state;
    }
    
    
    aesEncrypt(data, key) {
        // Chia dữ liệu thành từng khối 16 byte và mã hóa
        let encryptedData = [];
        for (let i = 0; i < data.length; i += 16) {
            let block = data.slice(i, i + 16);
            let encryptedBlock = this.encryptBlock(block, key);
            encryptedData = encryptedData.concat(encryptedBlock);
        }
        return encryptedData;
    }

    
    stringToBytes(str) {
        let bytes = [];
        for (let i = 0; i < str.length; i++) {
            bytes.push(str.charCodeAt(i));
        }
        return bytes;
    }

    bytesToHex(bytes) {
        return bytes.map(byte => ('0' + byte.toString(16)).slice(-2)).join('');
    }

    aesEncryptString(str, key) {
        let data = this.stringToBytes(str);
        
        
        // Padding để dữ liệu chia hết cho 16 byte
        while (data.length % 16 !== 0) {
            data.push(0x00);  // Padding bằng 0
        }

        let encryptedData = this.aesEncrypt(data, key);  // Sử dụng hàm mã hóa bạn đã viết
        
        return this.bytesToHex(encryptedData);  // Trả về chuỗi hex
    }
    
    runEncrypt(plaintext,key){
        let encrypted = '';  // Biến lưu kết quả mã hóa cuối cùng
        
        let keyArray = this.keyTokeyArray(key);
        
        // Lặp qua từng khối 16 ký tự của plaintext
        for (let i = 0; i < plaintext.length; i += 16) {
            // Cắt lấy 1 khối 16 ký tự
            let block = plaintext.slice(i, i + 16);
    
            // Kiểm tra nếu khối cuối cùng không đủ 16 ký tự, thêm padding (ví dụ: padding bằng ký tự null '\0')
            if (block.length < 16) {
                while (block.length < 16) {
                    block += '\0';  // Thêm padding bằng ký tự null
                }
            }
    
            // Mã hóa khối bằng hàm aesEncryptString
            let encryptedBlock = this.aesEncryptString(block, keyArray);
    
            // Nối kết quả mã hóa của khối vào biến encrypted
            encrypted += encryptedBlock;
        }
    
        return encrypted;  // Trả về kết quả mã hóa toàn bộ chuỗi
    }

    //decrypt
    invShiftRows(state) {
        let temp = [...state];
        
        // Dịch ngược hàng 1 (byte 1, 5, 9, 13)
        state[1] = temp[13];
        state[5] = temp[1];
        state[9] = temp[5];
        state[13] = temp[9];
    
        // Dịch ngược hàng 2 (byte 2, 6, 10, 14)
        state[2] = temp[10];
        state[6] = temp[14];
        state[10] = temp[2];
        state[14] = temp[6];
    
        // Dịch ngược hàng 3 (byte 3, 7, 11, 15)
        state[3] = temp[7];
        state[7] = temp[11];
        state[11] = temp[15];
        state[15] = temp[3];
    
        return state;
    }
    
    invSubBytes(state, invSbox) {
        for (let i = 0; i < state.length; i++) {
            state[i] = invSbox[state[i]];  // Thay thế bằng giá trị trong InvS-box
        }
        return state;
    }
    
    mul(a, b) {
        let p = 0;
        while (a && b) {
            if (b & 1) p ^= a;
            if (a & 0x80) a = (a << 1) ^ 0x11b;
            else a <<= 1;
            b >>= 1;
        }
        return p;
    }
    
    invMixColumns(state) {
        for (let i = 0; i < 4; i++) {
            let a = [];
            let b = [];
            for (let j = 0; j < 4; j++) {
                a[j] = state[i * 4 + j];
                b[j] = (state[i * 4 + j] << 1) & 0xFF;
                if ((state[i * 4 + j] & 0x80) !== 0) b[j] ^= 0x1B;
            }
            state[i * 4] = this.mul(0x0e, a[0]) ^ this.mul(0x0b, a[1]) ^ this.mul(0x0d, a[2]) ^ this.mul(0x09, a[3]);
            state[i * 4 + 1] = this.mul(0x09, a[0]) ^ this.mul(0x0e, a[1]) ^ this.mul(0x0b, a[2]) ^ this.mul(0x0d, a[3]);
            state[i * 4 + 2] = this.mul(0x0d, a[0]) ^ this.mul(0x09, a[1]) ^ this.mul(0x0e, a[2]) ^ this.mul(0x0b, a[3]);
            state[i * 4 + 3] = this.mul(0x0b, a[0]) ^ this.mul(0x0d, a[1]) ^ this.mul(0x09, a[2]) ^ this.mul(0x0e, a[3]);
        }
        return state;
    }
    
    
    aesDecrypt(ciphertext, key) {
        let state = [...ciphertext];  // Sao chép ciphertext
        let expandedKey = this.keyExpansion(key);  // Sinh khóa con từ khóa chính
    
        // Bước đầu tiên: Thêm khóa của vòng cuối
        this.addRoundKey(state, expandedKey.slice(160, 176));
    
        // Vòng lặp giải mã (9 vòng)
        for (let round = 9; round > 0; round--) {
            this.invShiftRows(state);
            this.invSubBytes(state, this.invSbox);
            this.addRoundKey(state, expandedKey.slice(round * 16, (round + 1) * 16));
            this.invMixColumns(state);
        }
    
        // Vòng cuối cùng không có invMixColumns
        this.invShiftRows(state);
        this.invSubBytes(state, this.invSbox);
        this.addRoundKey(state, expandedKey.slice(0, 16));
    
        return state;  // Trả về mảng dữ liệu giải mã
    }

    hexToString(hexArray){
        let string = hexArray.map(byte => String.fromCharCode(byte)).join('');
        return string;
    }
    removeTrailingZeros(data) {
        // Lặp từ cuối mảng và loại bỏ các số 0
        let i = data.length - 1;
        while (i >= 0 && data[i] === 0) {
            i--;
        }
        
        // Trả về mảng đã loại bỏ số 0 ở cuối
        return data.slice(0, i + 1);
    }

    stringToHex(hexString){
        let array = []
        for (let i = 0; i < hexString.length; i += 2) {
            array.push("0x" + hexString.slice(i, i + 2));
        }
        return array;
    }

    runDecrypt(ciphertext, key){
        let decrypted = '';
        let keyArray = this.keyTokeyArray(key)
        for (let i = 0; i < ciphertext.length; i += 32) { // Mỗi khối mã hóa là 32 ký tự hex
            let hexBlock = ciphertext.slice(i, i + 32);
            let byteBlock = this.stringToHex(hexBlock);
            let decryptedBlock = this.aesDecrypt(byteBlock, keyArray);
            decryptedBlock = this.removeTrailingZeros(decryptedBlock);
            decrypted += this.hexToString(decryptedBlock);
        }
        return decrypted;
    }

}

// Implement
// const key = [0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6, 0xab, 0xf7, 0xcf, 0x6b, 0x61, 0x7d, 0x4f, 0x1d];
// const testKey = [0xa1, 0x15, 0x15, 0x16, 0x28, 0x15, 0xd2, 0xa5, 0xab, 0xa1, 0xcf, 0x6b, 0x61, 0x64, 0x4f, 0x1d];

const aes = new AES();

let plaintext = "Hello, my name is Vazy";





const correctKey = aes.generateRandomHexString(16);
const randomKey = aes.generateRandomHexString(16);

let ciphertext = aes.runEncrypt(plaintext,correctKey);



console.log("Dữ liệu:",plaintext);
console.log("Dữ liệu mã hóa:",ciphertext);
console.log("Khóa đúng:",correctKey);
console.log("Khóa sai:",randomKey);
console.log("Dữ liệu giải mã khi dùng khóa đúng:",aes.runDecrypt(ciphertext,correctKey));
console.log("Dữ liệu giải mã khi dùng khóa sai:",aes.runDecrypt(ciphertext,randomKey));