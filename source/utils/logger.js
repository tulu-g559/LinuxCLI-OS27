import fs from 'fs';
import path from 'path';

const logFilePath = path.join(process.cwd(), 'logs', 'command_logs.json');

const ensureLogFileExists = () => {
  if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
  }
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '[]', 'utf8');
  }
};

export const logCommand = (command, output, exitCode) => {
  ensureLogFileExists();

  const logEntry = {
    command,
    timestamp: new Date().toISOString(),
    output,
    exitCode,
  };

  const logs = JSON.parse(fs.readFileSync(logFilePath, 'utf8'));
  logs.push(logEntry);
  fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), 'utf8');
};

export const clearLogs = () => {
  ensureLogFileExists();
  fs.writeFileSync(logFilePath, '[]', 'utf8');
};
