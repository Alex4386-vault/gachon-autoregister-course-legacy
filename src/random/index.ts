
const possible =
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$%~';

export function createRandomness(a):string {
let text = '';

for (let i = a; i--;) {
  text += possible.charAt(Math.floor(Math.random() * possible.length));
}

return text;
}