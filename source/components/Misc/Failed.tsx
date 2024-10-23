import {$errorMsg} from '@/stores/baseStore.js';
import {useStore} from '@nanostores/react';
import {Box, Text, useApp} from 'ink';
import React, {useEffect} from 'react';

const Failed = () => {
	const errorMsg = useStore($errorMsg);

	const {exit} = useApp();

	useEffect(() => {
		exit();
	}, []);

	return (
		<Box>
			<Text color={'red'}>{errorMsg}</Text>
		</Box>
	);
};

export default Failed;
