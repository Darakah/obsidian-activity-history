import { Plugin } from 'obsidian';
import { ActivityHistorySettingTab } from './settings'
import { addProject, removeProject, updateActivityAll } from './utils'
import { ActivityHistoryProcessor } from './block'
import { DEFAULT_SETTINGS } from './constants';
import type { ActivitySettings } from './types';

export default class ActivityHistoryPlugin extends Plugin {
	settings: ActivitySettings;
	containerEl: HTMLElement;
	testMe: number;

	async onload() {
		// Load message
		await this.loadSettings();
		console.log('Loaded Activity Plugin');

		// Register activity history block renderer
		this.registerMarkdownCodeBlockProcessor('ActivityHistory', async (source, el, ctx) => {
			const proc = new ActivityHistoryProcessor();
			await proc.run(source, el, this.settings);
		});

		// Update all tracked projects on events
		setInterval(() => {
			if(this.settings.firstRun){
				removeProject('/', this.settings)
				addProject('/', this.settings, this.app.vault.getMarkdownFiles())
				this.settings.firstRun = false
				this.saveSettings();
			}
			
			updateActivityAll(this.settings, this.app.vault.getMarkdownFiles());
			this.saveSettings();
		  }, 2000);
	
		this.addSettingTab(new ActivityHistorySettingTab(this.app, this));
	}

	onunload() {
		console.log('unloading activity plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
