#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';
import { logCommand, clearLogs } from './utils/logger.js';
import readline from 'readline';
import { exec } from 'child_process';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
  });

// Auto-start logging when app starts
console.log("Command Logging is enabled. Type 'clear-logs' to erase logs.");
console.log("Type 'toggle-logging' to enable/disable auto-logging.");

rl.on('line', (input) => {
  if (input.trim() === 'clear-logs') {
    clearLogs();
    console.log('Logs cleared.');
    return;
  }

  exec(input, (error, stdout, stderr) => {
    const exitCode = error ? error.code : 0;
    logCommand(input, stdout || stderr, exitCode);
    console.log(stdout || stderr);
  });
});

const cli = meow(
	`
		Usage
		  $ control_centre

		Options
			--name  Your name

		Examples
		  $ control_centre --name=Jane
		  Hello, Jane
	`,
	{
		importMeta: import.meta,
	},
);

render(<App name={cli.flags.name} />);
