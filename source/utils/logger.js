import fs from 'fs';
import path from 'path';

const logFilePath = path.join(process.cwd(), 'logs', 'command_logs.json');
let autoLoggingEnabled = true;

const ensureLogFileExists = () => {
  if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
  }
  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '[]', 'utf8');
  }
};

export const logCommand = (command, output, exitCode) => {
    if (!autoLoggingEnabled) return;
    
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

const stateFilePath = path.join(process.cwd(), 'logs', 'logging_state.json');

const loadLoggingState = () => {
  if (fs.existsSync(stateFilePath)) {
    try {
      const state = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));
      autoLoggingEnabled = state.autoLoggingEnabled;
    } catch (error) {
      console.error('Error reading logging state. Resetting to ENABLED.');
      autoLoggingEnabled = true;
    }
  }
};
export const toggleLogging = () => {
  autoLoggingEnabled = !autoLoggingEnabled;
  fs.writeFileSync(stateFilePath, JSON.stringify({ autoLoggingEnabled }), 'utf8'); //Save state
  console.log(`Auto-logging is now ${autoLoggingEnabled ? 'ENABLED' : 'DISABLED'}`);
};


loadLoggingState(); 