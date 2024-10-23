import {exec} from 'child_process';
import {log, logError} from '@/functions/log.js';

export const runCommand = async (command: string) => {
	const child = exec(
		command,
		(error: Error | null, stdout: string, stderr: string) => {
			if (error) {
				logError(`Error executing command: ${error.message}`);
				return;
			}

			if (stderr) {
				logError(`Standard Error: ${stderr}`);
				return;
			}

			console.log(`Command Output: ${stdout}`);
		},
	);

	child.on('exit', (code: number, signal: string) => {
		log(`Child process exited with code ${code} and signal ${signal}`);
		process.exit();
	});

	child.on('close', (code: number) => {
		log(`Child process closed with code ${code}`);
		process.exit();
	});

	child.on('error', (err: Error) => {
		logError(`Failed to start child process: ${err.message}`);
		process.exit();
	});
};
