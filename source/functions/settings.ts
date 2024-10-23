import {useEffect} from 'react';
import fs from 'fs';
import os from 'os';
import {
	$commands,
	$currStep,
	$errorMsg,
	$paths,
	$username,
} from '@/stores/baseStore.js';
import {logError} from '@/functions/log.js';
import {settingsFilePath} from '@/functions/variables.js';
import path from 'path';
import {exec} from 'child_process';
import {promisify} from 'util';

type TSettings = {
	localConfig: {
		currentWorkspace: string;
	};
	config: {
		username: string;
		workspaces: {
			[workspace: string]: string;
		};
		commands: {
			[workspace: string]: {
				[alias: string]: string;
			};
		};
		savedPaths: {
			[workspace: string]: {
				[pathAlias: string]: string;
			};
		};
	};
};

export const readSettingsJson = (): TSettings | null => {
	try {
		const data = fs.readFileSync(settingsFilePath, 'utf-8');
		const jsonData = JSON.parse(data);
		return jsonData;
	} catch (err) {
		logError('Error reading settings JSON file: ', err);
		return null;
	}
};

const saveToSettingsJson = (settingsObj: TSettings): Promise<void> => {
	return new Promise((resolve, reject) => {
		const jsonString = JSON.stringify(settingsObj, null, 4);

		fs.writeFile(settingsFilePath, jsonString, err => {
			if (err) {
				reject('Error writing to settings.json');
			} else {
				resolve();
			}
		});
	});
};

export const setupInit = async (workspace: string): Promise<void> => {
	try {
		const currOperatingSystem = os.platform();
		const username = os.hostname();

		const newSettings: TSettings = {
			localConfig: {
				currentWorkspace: workspace,
			},
			config: {
				username: username,
				workspaces: {
					[workspace]: currOperatingSystem,
				},
				commands: {
					[workspace]: {
						code: 'code #',
						explorer: 'ii #',
						ls: 'ls #',
					},
				},
				savedPaths: {
					[workspace]: {},
				},
			},
		};

		saveToSettingsJson(newSettings);
	} catch (error) {
		logError('Error setup:', error);
		throw error;
	}
};

export const setupWorkspace = async (workspace: string): Promise<void> => {
	try {
		const settings = readSettingsJson();

		if (!settings) {
			throw new Error('Something went wrong!');
			// TODO:: Might take user to setup
		}

		if (!settings.config.workspaces[workspace]) {
			const currOperatingSystem = os.platform();
			settings.config.workspaces[workspace] = currOperatingSystem;
		}

		settings.localConfig.currentWorkspace = workspace;

		await saveToSettingsJson(settings);
	} catch (error) {
		logError('Error setting current workspace:', error);
		throw error;
	}
};

export const addToPaths = async (
	alias: string,
	_path: string,
): Promise<void> => {
	try {
		const settings = readSettingsJson();
		const currWorkspace = settings?.localConfig.currentWorkspace;

		if (!settings || !currWorkspace) {
			throw new Error('Something went wrong!');
			// TODO:: Might take user to setup
		}

		settings.config.savedPaths = settings.config.savedPaths ?? {};
		settings.config.savedPaths[currWorkspace] =
			settings.config.savedPaths[currWorkspace] ?? {};

		settings.config.savedPaths[currWorkspace][alias] = _path;

		await saveToSettingsJson(settings);
	} catch (error) {
		logError('Error adding to paths:', error);
		throw error;
	}
};

export const openSettingsWithDefaultEditor = async (): Promise<void> => {
	const execPromise = promisify(exec);

	const normalizedPath = path.normalize(settingsFilePath);

	let command: string;

	if (process.platform === 'win32') {
		command = `start "" "${normalizedPath}"`;
	} else if (process.platform === 'darwin') {
		command = `open "${normalizedPath}"`;
	} else if (process.platform === 'linux') {
		command = `xdg-open "${normalizedPath}"`;
	} else {
		throw new Error('Unsupported operating system');
	}

	try {
		await execPromise(command);
	} catch (error) {
		logError(`Error opening file: ${(error as Error).message}`);
		throw error;
	}
};

export const useSettings = () => {
	useEffect(() => {
		const settings = readSettingsJson();
		const currWorkspace = settings?.localConfig.currentWorkspace;

		if (!settings || !currWorkspace) {
			$currStep.set('SETUP');
			return;
		}

		$username.set(settings.config.username);
		$commands.set(settings.config.commands[currWorkspace] ?? {});
		$paths.set(settings.config.savedPaths[currWorkspace] ?? {});

		return () => {};
	}, []);

	return {};
};
