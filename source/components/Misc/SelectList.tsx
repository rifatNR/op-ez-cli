import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import {logError} from '@/functions/log.js';

export type TItem = {
	label: string;
	subLabel?: string;
	value: string;
};
type TProps = {
	items: TItem[];
	onEnter: (x: TItem) => void;
	onRightArrow?: (x: TItem) => void;
	specialKeyAction?: {
		[key: string]: (x: TItem) => void;
	};
};
const SelectList = ({
	items,
	onEnter,
	onRightArrow,
	specialKeyAction,
}: TProps) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	useInput((input, key) => {
		if (key.downArrow) {
			setSelectedIndex(prevIndex => (prevIndex + 1) % items.length);
		} else if (key.upArrow) {
			setSelectedIndex(
				prevIndex => (prevIndex - 1 + items.length) % items.length,
			);
		} else if (key.return) {
			const selectedItem = items[selectedIndex];

			if (selectedItem) {
				onEnter(selectedItem);
			} else {
				logError('No Path Found!');
			}
		} else if (key.rightArrow) {
			const selectedItem = items[selectedIndex];

			if (selectedItem && typeof onRightArrow === 'function') {
				onRightArrow(selectedItem);
			} else {
				logError('No Path Found!');
			}
		} else if (
			specialKeyAction &&
			Object.keys(specialKeyAction).includes(input)
		) {
			const selectedItem = items[selectedIndex];

			const actionFunction = specialKeyAction[input];

			if (selectedItem && typeof actionFunction === 'function') {
				actionFunction(selectedItem);
			} else {
				logError('No Path Found!');
			}
		}
	});

	// return (
	// 	<Box flexDirection="column">
	// 		{items?.map((item, index) =>
	// 			index === selectedIndex ? (
	// 				<Box
	// 					key={index}
	// 					borderColor={'green'}
	// 					borderStyle={'bold'}
	// 					paddingX={1}
	// 				>
	// 					<Text>{item.label}</Text>
	// 					<Text> : </Text>
	// 					{item.subLabel && <Text color={'#d0d0d031'}>{item.subLabel}</Text>}
	// 				</Box>
	// 			) : (
	// 				<Box key={index} paddingX={1} margin={1}>
	// 					<Text>{item.label}</Text>
	// 				</Box>
	// 			),
	// 		)}
	// 	</Box>
	// );
	return (
		<Box flexDirection="column">
			{items?.map((item, index) =>
				index === selectedIndex ? (
					<Text key={index} backgroundColor={'green'}>
						<Text> </Text>
						<Text>{item.label}</Text>
						<Text> : </Text>
						{item.subLabel && <Text color={'#d0d0d031'}>{item.subLabel}</Text>}
						<Text> </Text>
					</Text>
				) : (
					<Text key={index}>
						<Text> </Text>
						<Text>{item.label}</Text>
						<Text> </Text>
					</Text>
				),
			)}
		</Box>
	);
};

export default SelectList;
