#!/usr/bin/env node

// This file serves as a bridge to run Next.js dev server
// since the package.json is configured to run this file

import { spawn } from 'child_process';

console.log('Starting Next.js development server...');

const nextDev = spawn('npx', ['next', 'dev', '--port', '5000'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' }
});

nextDev.on('error', (error) => {
  console.error('Failed to start Next.js:', error);
  process.exit(1);
});

nextDev.on('close', (code) => {
  console.log(`Next.js process exited with code ${code}`);
  process.exit(code ?? 0);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down Next.js server...');
  nextDev.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\nShutting down Next.js server...');
  nextDev.kill('SIGTERM');
});