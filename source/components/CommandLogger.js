import fs from 'fs';
import path from 'path';
import { logCommand, clearLogs } from '../utils/logger.js';

const logFilePath = path.join(process.cwd(), 'logs', 'command_logs.json');

export default class CommandLogger {
  static logCommand(command, output, exitCode) {
    logCommand(command, output, exitCode);
  }

  static clearLogs() {
    clearLogs();
  }

  static getLogs() {
    if (fs.existsSync(logFilePath)) {
      return fs.readFileSync(logFilePath, 'utf8');
    }
    return 'No logs found.';
  }
}
