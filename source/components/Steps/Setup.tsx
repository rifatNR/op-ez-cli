import SelectList, {TItem} from '@/components/Misc/SelectList.js';
import {
	readSettingsJson,
	setupWorkspace,
	setupInit,
} from '@/functions/settings.js';
import {$currStep, $errorMsg, $successMsg} from '@/stores/baseStore.js';
import {Box, Text, useInput} from 'ink';
import TextInput from 'ink-text-input';
import React, {useEffect, useMemo, useState} from 'react';

const Setup = () => {
	const [newWorkspace, setNewWorkspace] = useState('');
	const [setupStep, setSetupStep] = useState<
		'INIT' | 'SELECT_WORKSPACE' | 'CREATE_WORKSPACE' | 'FULL_SETUP'
	>('INIT');
	const [workspaceList, setWorkspaceList] = useState<{
		[workspace: string]: string;
	}>({});

	const handleCreateWorkspace = async () => {
		try {
			if (!newWorkspace || newWorkspace == '') {
				$errorMsg.set('No workspace name entered. Failed to create workspace');
				$currStep.set('FAILED');
			} else {
				if (setupStep == 'FULL_SETUP') {
					await setupInit(newWorkspace);
					$successMsg.set('🎉 Setup successful. 🎉');
				} else if (setupStep == 'CREATE_WORKSPACE') {
					setupWorkspace(newWorkspace);
				}

				$currStep.set('SUCCESS');
			}
		} catch (error) {
			$errorMsg.set('Failed to add path!');
			$currStep.set('FAILED');
		}
	};

	useInput((input, key) => {
		if (key.return) {
			if (['CREATE_WORKSPACE', 'FULL_SETUP'].includes(setupStep)) {
				handleCreateWorkspace();
			}
		}
	});

	useEffect(() => {
		const settings = readSettingsJson();

		if (!settings) {
			setSetupStep('FULL_SETUP');
		} else if (
			!settings.config.workspaces ||
			Object.keys(settings.config.workspaces).length == 0
		) {
			setSetupStep('FULL_SETUP');
		} else {
			setWorkspaceList(settings.config.workspaces);
			setSetupStep('SELECT_WORKSPACE');
		}
	}, []);

	const items = useMemo(() => {
		const listItems = Object.entries(workspaceList).map(([key, value]) => ({
			label: key,
			subLabel: value,
			value: key,
		}));

		listItems.push({
			label: 'Create',
			subLabel: 'Create a new workspace',
			value: '#-create-#',
		});

		return listItems;
	}, [workspaceList]);

	const onSelect = async (item: TItem) => {
		console.log(item);
		if (item.value == '#-create-#') {
			setSetupStep('CREATE_WORKSPACE');
		} else {
			await setupWorkspace(item.value);
		}
	};

	return (
		<Box>
			{['CREATE_WORKSPACE', 'FULL_SETUP'].includes(setupStep) ? (
				<Box flexDirection="column">
					<Text backgroundColor={'green'} color={'white'} bold>
						{' '}
						CREATE WORKSPACE{' '}
					</Text>
					<Box>
						<Text>Enter a new workspace name: </Text>
						<TextInput value={newWorkspace} onChange={setNewWorkspace} />
					</Box>
				</Box>
			) : (
				<Box>
					<SelectList items={items} onEnter={onSelect} />
				</Box>
			)}
		</Box>
	);
};

export default Setup;
