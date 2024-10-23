import SelectList, {TItem} from '@/components/Misc/SelectList.js';
import {$currStep, $paths, $selectedPath} from '@/stores/baseStore.js';
import {useStore} from '@nanostores/react';
import {Box} from 'ink';
import React, {useMemo} from 'react';

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

	return (
		<Box>
			<SelectList items={items} onSelect={onSelect} />
		</Box>
	);
};

export default PathList;
