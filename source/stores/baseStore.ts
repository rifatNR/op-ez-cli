import {atom, map} from 'nanostores';
import {v4 as uuidv4} from 'uuid';

type TCommands = {
	[alias: string]: string;
};
type TPaths = {
	[alias: string]: string;
};

export const $username = atom<string | undefined>();
export const $commands = map<TCommands>();
export const $paths = map<TPaths>();

export const $currStep = atom<
	| 'START'
	| 'SAVE_PATH'
	| 'SELECT_PATH'
	| 'SELECT_COMMAND'
	| 'OPEN_SETTINGS'
	| 'SETUP'
	| 'FAILED'
	| 'SUCCESS'
>('START');
export const $selectedPath = atom<string | undefined>();
export const $pathToBeSaved = atom<string | undefined>();
export const $errorMsg = atom<string>('Error');
export const $successMsg = atom<string>('Success');
