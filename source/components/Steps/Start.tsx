import {Spinner, spinners} from '@/components/Misc/Spinner.js';
import {Box, Text} from 'ink';
import React from 'react';

const Start = () => {
	return (
		<Box>
			<Text>
				<Spinner frames={spinners.dotsRound} color="magenta" /> Setting UP
			</Text>
		</Box>
	);
};

export default Start;
