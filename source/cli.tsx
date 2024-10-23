#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';
import tty from 'node:tty';

const cli = meow(
	`
	op: A CLI Tool for Path and Command Management

	Usage
	  $ op

	Commands:
	  op                   List saved paths and available commands.
	  op .                 List commands for the current directory.
	  op save <path>       Save a new path with an optional alias.
	  op config            Open config file in the default editor.
	  op sync              Sync configuration across devices (login required).
	  op login             Log in to sync settings.
	  op setup             Set up or select a workspace environment.

	Options:
	  -h, --help           Show help message.
	  -v, --version        Show tool version.

	Examples:
	  op                   Show all saved paths.
	  op .                 List commands in the current directory.
	  op save /my/path     Save the specified path.
	  op config            Edit the configuration file.
	  op sync              Sync settings after logging in.

	  For more info, see the README or visit the GitHub repository.
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
		},
	},
);

// render(<App name={cli.flags.name} />);
render(<App />);
