import os from 'os';

// const homedir = os.homedir();
const homedir = process.cwd(); // TODO:: FIX STATIC
const settingsFileName = 'op-settings.json';
export const settingsFilePath = `${homedir}/${settingsFileName}`;
