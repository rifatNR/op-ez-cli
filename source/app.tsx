import React, {useEffect} from 'react';
import {Box, Text} from 'ink';
import {useStore} from '@nanostores/react';
import {useCommands} from '@/functions/commands.js';
import {useSettings} from '@/functions/settings.js';
import {$currStep} from '@/stores/baseStore.js';
import PathList from '@/components/Steps/PathList.js';
import CommandList from '@/components/Steps/CommandList.js';
import Start from '@/components/Steps/Start.js';
import SavePath from '@/components/Steps/SavePath.js';
import Success from '@/components/Steps/Success.js';
import Failed from '@/components/Misc/Failed.js';
import OpenSettings from '@/components/Steps/OpenSettings.js';
import Setup from '@/components/Steps/Setup.js';

const Steps = {
	START: Start,
	SAVE_PATH: SavePath,
	SELECT_PATH: PathList,
	SELECT_COMMAND: CommandList,
	OPEN_SETTINGS: OpenSettings,
	SETUP: Setup,
	FAILED: Failed,
	SUCCESS: Success,
};

export default function App() {
	const currStep = useStore($currStep);

	useCommands();
	useSettings();

	const CurrStepComponent = Steps[currStep];

	return (
		<Box flexDirection="column">
			<CurrStepComponent />
		</Box>
	);
}
