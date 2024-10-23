import {$successMsg} from '@/stores/baseStore.js';
import {useStore} from '@nanostores/react';
import {Box, Text, useApp} from 'ink';
import React, {useEffect} from 'react';

const Success = () => {
	const successMsg = useStore($successMsg);

	const {exit} = useApp();

	useEffect(() => {
		exit();
	}, []);

	return (
		<Box>
			<Text color={'green'}>{successMsg}</Text>
		</Box>
	);
};

export default Success;
