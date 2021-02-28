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
		setInterval(function(this, settings, saveSettings, loadSettings) {
			if(settings.settings.firstRun){
				removeProject('/', settings.settings)
				addProject('/', settings.settings, this.app.vault.getMarkdownFiles())
				settings.settings.firstRun = false
				saveSettings;
			}

			console.log(settings.settings)
			updateActivityAll(settings.settings, this.app.vault.getMarkdownFiles());
			saveSettings;
			loadSettings;
		}, 200000, this, this.settings, this.saveSettings, this.loadSettings)
		
		await this.saveSettings();

		this.addSettingTab(new ActivityHistorySettingTab(this.app, this));
	}

	onunload() {
		console.log('unloading activity plugin');
	}

	async loadSettings() {
		console.log(this.app.workspace)
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
