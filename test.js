import React from 'react';
import chalk from 'chalk';
import test from 'ava';
import {render} from 'ink-testing-library';
import App from './source/app.js';

import { logCommand, clearLogs } from './source/utils/logger.js';
import fs from 'fs';
import path from 'path';

const logFilePath = path.join(process.cwd(), 'logs', 'command_logs.json');

test.beforeEach(() => {
  clearLogs();
});

test('Should log a command', (t) => {
  logCommand('ls -la', 'output text', 0);
  const logs = JSON.parse(fs.readFileSync(logFilePath, 'utf8'));

  t.is(logs.length, 1);
  t.is(logs[0].command, 'ls -la');
  t.is(logs[0].output, 'output text');
  t.is(logs[0].exitCode, 0);
});

test('Should clear logs', (t) => {
  logCommand('ls -la', 'output text', 0);
  clearLogs();
  const logs = JSON.parse(fs.readFileSync(logFilePath, 'utf8'));

  t.deepEqual(logs, []); // AVA uses `t.deepEqual()` for array comparison
});

test('greet unknown user', t => {
	const {lastFrame} = render(<App />);

	t.is(lastFrame(), `Hello, ${chalk.green('Stranger')}`);
});

test('greet user with a name', t => {
	const {lastFrame} = render(<App name="Jane" />);

	t.is(lastFrame(), `Hello, ${chalk.green('Jane')}`);
});
