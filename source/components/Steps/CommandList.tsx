import SelectList, {TItem} from '@/components/Misc/SelectList.js';
import {runCommand} from '@/functions/runCommand.js';
import {
	$commands,
	$currStep,
	$selectedPath,
	$successMsg,
} from '@/stores/baseStore.js';
import {useStore} from '@nanostores/react';
import {Box} from 'ink';
import React, {useMemo} from 'react';

const CommandList = () => {
	const commands = useStore($commands);
	const selectedPath = useStore($selectedPath);

	const items = useMemo(
		() =>
			Object.entries(commands).map(([key, value]) => ({
				label: key,
				subLabel: value.replace('#', selectedPath ?? '#'),
				value: value,
			})),
		[commands, selectedPath],
	);

	const onSelect = async (item: TItem) => {
		if (selectedPath) {
			const selectedCommand = item.value.replace('#', selectedPath);
			runCommand(selectedCommand);
			$successMsg.set('Command running successful.');
			$currStep.set('SUCCESS');
		}
	};

	return (
		<Box>
			<SelectList items={items} onEnter={onSelect} />
		</Box>
	);
};

export default CommandList;
