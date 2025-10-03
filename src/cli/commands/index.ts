import { debug } from './debug';
import { list } from './list';
import { add } from './add';
import { init } from './init';
import { vscode } from './vscode';
import { moduleCmd } from './module';

// Export all commands
export const commands = [debug, list, add, init, vscode, moduleCmd];
