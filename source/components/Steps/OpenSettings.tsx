import {Spinner, spinners} from '@/components/Misc/Spinner.js';
import {openSettingsWithDefaultEditor} from '@/functions/settings.js';
import {$currStep, $errorMsg, $successMsg} from '@/stores/baseStore.js';
import {Box, Text} from 'ink';
import React, {useEffect} from 'react';

const OpenSettings = () => {
	const openSettings = async () => {
		try {
			await openSettingsWithDefaultEditor();

			$successMsg.set('Config file opened successfully');
			$currStep.set('SUCCESS');
		} catch (error) {
			$errorMsg.set('Failed to open config!');
			$currStep.set('FAILED');
		}
	};

	useEffect(() => {
		const intervalId = setTimeout(() => {
			openSettings();
		}, 500);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<Box>
			<Text>
				<Spinner frames={spinners.dotsRound} color="magenta" /> Opening Config
			</Text>
		</Box>
	);
};

export default OpenSettings;
