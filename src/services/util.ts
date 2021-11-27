import fs from 'fs'
import path from 'path'

export const base64_decode = (data: string) => {
    let b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = '',
        tmp_arr = [];
    if (!data) {
        return data;
    }
    data += '';
    do {
        // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if (h3 === 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 === 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
    dec = tmp_arr.join('');
    return decodeURIComponent(escape(dec.replace(/\0+$/, '')));
};

export const base64_encode = (data: string) => {
    let b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = '',
        tmp_arr = [];
    if (!data) {
        return data;
    }
    data = unescape(encodeURIComponent(data));
    do {
        // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);
        bits = o1 << 16 | o2 << 8 | o3;
        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;
        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);
    enc = tmp_arr.join('');
    let r = data.length % 3;
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
};

export function createInterface(data: object[], name: string, folderFront: string = '') {

    console.log('########################CREATE - INTERFACE #################################');
    console.log(`######################## ${name} #################################`);

    const dados = data.length ? data[0] : data

    let pathFront = ''

    if (folderFront !== '')
        if (fs.existsSync(path.resolve(path.dirname(''), '../' + folderFront + '/src/models/interfaces.ts')))
            pathFront = path.resolve(path.dirname(''), '../' + folderFront + '/src/models/interfaces.ts')


    const text = fs.readFileSync(path.resolve(__dirname, '../models/interfaces.ts'), 'utf8')

    if (text.search(name) == -1) {

        let content = `\n\nexport interface ${name} { \n`;
        for (let i in dados) {

            //@ts-ignore
            dados[i] === null ? dados[i] = '' : dados[i]

            //@ts-ignore
            content += '  ' + i + ':' + typeof (dados[i]) + ';\n'
        }

        content += '}'

        fs.writeFile(path.resolve(__dirname, '../models/interfaces.ts'), content, { flag: 'a+' }, () => { });

        if (pathFront !== '') fs.writeFile(pathFront, content, { flag: 'a+' }, () => { });

    }

    console.log('########################REMOVA ESTA FUNÇÃO #################################');

}

export default {
    createInterface,
    base64_decode,
    base64_encode
}