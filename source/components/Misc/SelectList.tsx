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
	onSelect: (x: TItem) => void;
};
const SelectList = ({items, onSelect}: TProps) => {
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
				onSelect(selectedItem);
			} else {
				logError('No Item Found!');
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
