// import {Command} from 'commander';
import fs from 'fs';
import os from 'os';
import path from 'path';
import yargs, {Arguments, Argv} from 'yargs';
import {hideBin} from 'yargs/helpers';
import express from 'express';
import {useEffect, useMemo} from 'react';
import {$currStep, $pathToBeSaved, $selectedPath} from '@/stores/baseStore.js';

export const useCommands = () => {
	// console.clear();

	useEffect(() => {
		yargs(hideBin(process.argv))
			.command(
				'test',
				'just test',
				yargs => {},
				argv => {
					console.log(argv);
				},
			)
			.command(
				'config',
				'open config file',
				yargs => {},
				argv => {
					$currStep.set('OPEN_SETTINGS');
				},
			)
			.command(
				'save [path]',
				'save the path',
				yargs => {
					return yargs.positional('path', {
						describe: 'path that needs to be saved',
						default: '.',
					});
				},
				(argv: any) => {
					$currStep.set('SAVE_PATH');
					$pathToBeSaved.set(path.resolve(argv.path));
				},
			)
			.command(
				'* [file]',
				'Handles file operations',
				(yargs: any) => {
					return yargs.positional('file', {
						describe: 'Optionally open a specific file',
						type: 'string',
					});
				},
				(argv: any) => {
					if (argv.file) {
						$selectedPath.set(argv.file);
						$currStep.set('SELECT_COMMAND');
					} else {
						$currStep.set('SELECT_PATH');
					}
				},
			)
			.parse();

		return () => {};
	}, []);

	return {};
};
