import os from 'os';

const homedir = os.homedir();
// const homedir = process.cwd();
const settingsFileName = 'op-settings.json';
export const settingsFilePath = `${homedir}/${settingsFileName}`;
