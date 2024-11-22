import SelectList, {TItem} from '@/components/Misc/SelectList.js';
import {readSettingsJson, setupInit} from '@/functions/settings.js';
import {$currStep, $errorMsg, $successMsg} from '@/stores/baseStore.js';
import {Box, Text, useInput} from 'ink';
import TextInput from 'ink-text-input';
import React, {useEffect, useMemo, useState} from 'react';

const Setup = () => {
	const setupProcess = async () => {
		const settings = readSettingsJson();

		if (!settings) {
			await setupInit();
			$successMsg.set('🎉 Setup successful. 🎉');
		}
		$currStep.set('SUCCESS');
	};

	useEffect(() => {
		setupProcess();
	}, []);

	return (
		<Box>
			<Box flexDirection="column">
				<Text backgroundColor={'green'} color={'white'} bold>
					WELCOME
				</Text>
			</Box>
		</Box>
	);
};

export default Setup;
