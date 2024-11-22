import SelectList, {TItem} from '@/components/Misc/SelectList.js';
import {runCommand} from '@/functions/runCommand.js';
import {$currStep, $paths, $selectedPath} from '@/stores/baseStore.js';
import {useStore} from '@nanostores/react';
import {Box, Text} from 'ink';
import React, {useMemo} from 'react';
import path from 'path';

const PathList = () => {
	const paths = useStore($paths);

	const items = useMemo(
		() =>
			Object.entries(paths).map(([key, value]) => ({
				label: key,
				subLabel: value,
				value: value,
			})),
		[paths],
	);

	const onSelect = (item: TItem) => {
		$selectedPath.set(item.value);
		$currStep.set('SELECT_COMMAND');
	};
	const onRightArrow = (item: TItem) => {
		$selectedPath.set(item.value);
		console.log(item.value);
		const targetPath = path.resolve(item.value);
		process.chdir('~' + targetPath);
		// runCommand(`cd ${item.value}`);
	};
	const onCPress = (item: TItem) => {
		$selectedPath.set(item.value);
		runCommand(`code ${item.value}`);
	};
	const onXPress = (item: TItem) => {
		$selectedPath.set(item.value);
		console.log('X Pressed');
	};

	return (
		<Box flexDirection="column">
			<Box flexDirection="column" marginBottom={1}>
				<Text>
					◉⠀<Text backgroundColor={'#A855F7'}>⠀↩ Enter</Text> to select Path
				</Text>
				<Text>
					◉⠀<Text backgroundColor={'#e8f59e'}>⠀c </Text> to open in vscode
				</Text>
			</Box>
			<SelectList
				items={items}
				onEnter={onSelect}
				onRightArrow={onRightArrow}
				specialKeyAction={{
					c: onCPress,
					x: onXPress,
				}}
			/>
		</Box>
	);
};

export default PathList;
