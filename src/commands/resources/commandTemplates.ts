import path from 'node:path';
import chokidar from 'chokidar';
import { getDirectoryFromFileURL, getModulesInFolder } from '../../utils.js';
import actionCommand from './commandTemplates/cmd.mod.actionCommand.js';

const TEMPLATES = {
  actionCommand
};

// TODO: a more centralised way to reload?
const TEMPLATES_FOLDER = path.join(getDirectoryFromFileURL(import.meta.url), 'commandTemplates');
chokidar.watch(TEMPLATES_FOLDER).on('change', async path => {
  if (!path.endsWith('.js')) return;
  (await getModulesInFolder(TEMPLATES_FOLDER)).forEach(array => 
    Reflect.set(TEMPLATES, <string>array[0].split('.')[2], array[1]));
});

export default TEMPLATES;