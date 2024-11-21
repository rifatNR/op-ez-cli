import {addToPaths} from '@/functions/settings.js';
import {
	$currStep,
	$errorMsg,
	$pathToBeSaved,
	$successMsg,
} from '@/stores/baseStore.js';
import {useStore} from '@nanostores/react';
import {Box, Text, useInput} from 'ink';
import TextInput from 'ink-text-input';
import path from 'node:path';
import React, {useState} from 'react';

const SavePath = () => {
	const [alias, setAlias] = useState('');
	const pathToBeSaved = useStore($pathToBeSaved);

	const handleSavePath = async () => {
		try {
			if (!pathToBeSaved) {
				$errorMsg.set('No path found.');
				$currStep.set('FAILED');
			} else if (!alias || alias == '') {
				// $errorMsg.set('No alias entered. Failed to save path');
				// $currStep.set('FAILED');
				await addToPaths(path.basename(pathToBeSaved), pathToBeSaved);
				$successMsg.set('Path added successfully');
				$currStep.set('SUCCESS');
			} else {
				await addToPaths(alias, pathToBeSaved);
				$successMsg.set('Path added successfully');
				$currStep.set('SUCCESS');
			}
		} catch (error) {
			$errorMsg.set('Failed to add path!');
			$currStep.set('FAILED');
		}
	};

	useInput((input, key) => {
		if (key.return) {
			handleSavePath();
		}
	});

	return (
		<Box>
			<Box flexDirection="column">
				<Box>
					<Text backgroundColor={'green'} color={'white'} bold>
						{' '}
						CREATE PATH:{' '}
					</Text>
					<Text> {pathToBeSaved}</Text>
				</Box>
				<Box>
					<Text>
						Enter an alias for this path <Text dimColor>(Optional)</Text>:{' '}
					</Text>
					<TextInput value={alias} onChange={setAlias} />
				</Box>
			</Box>
		</Box>
	);
};

export default SavePath;
