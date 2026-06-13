import { spawn } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const applications = ['frontend', 'backend'];
const children = applications.map((workspace) =>
  spawn(npmCommand, ['run', 'dev', '--workspace', workspace], {
    stdio: 'inherit'
  })
);

function stopChildren(signal) {
  for (const child of children) {
    if (!child.killed) child.kill(signal);
  }
}

process.on('SIGINT', () => stopChildren('SIGINT'));
process.on('SIGTERM', () => stopChildren('SIGTERM'));

for (const child of children) {
  child.on('exit', (code) => {
    if (code && code !== 0) {
      stopChildren('SIGTERM');
      process.exitCode = code;
    }
  });
}

