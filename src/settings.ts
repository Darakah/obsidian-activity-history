import { App, PluginSettingTab, Setting } from 'obsidian'
import type { ActivityHistoryPlugin } from 'main'
import { addProject, removeProject, isTracked, isValidProject, isHexColor } from './utils'

export class ActivityHistorySettingTab extends PluginSettingTab {
	plugin: ActivityHistoryPlugin;

	constructor(app: App, plugin: ActivityHistoryPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();
		containerEl.createEl('h2', { text: 'Activity History Settings' });

		new Setting(containerEl)
			.setName('Tracked Projects:')
			.setDesc(this.plugin.settings.trackedProjects.join(" ---------  "))

		new Setting(containerEl)
			.setName('Track Project:')
			.setDesc('Add project to tracking list. e.g. write `Project 1` to track the project located in `/Project 1`')
			.addText(text => text
				.setPlaceholder(`Project Example`)
				.onChange(async (value) => {

					if(value.trim() === '/'){
						return
					}

					// check if project already tracked
					if (isTracked(value, this.plugin.settings.trackedProjects)) {
						return
					}

					// check if project is a valid project
					if (!isValidProject(value, this.plugin.app.vault.getMarkdownFiles())) {
						return
					}

					// add & initialize project
					addProject(value, this.plugin.settings, this.plugin.app.vault.getMarkdownFiles());
					// save settings
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Stop Tracking Project:')
			.setDesc('Remove project from the tracking list. e.g. `Project 1`')
			.addText(text => text
				.setPlaceholder(`Project Example`)
				.onChange(async (value) => {

					if(value.trim() === '/'){
						return
					}
					
					// check if project being tracked
					if (!isTracked(value, this.plugin.settings.trackedProjects)) {
						return
					}

					// add & initialize project
					removeProject(value, this.plugin.settings);
					// save settings
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Activity 1 Color:')
			.setDesc('Color for lowest activity. Placeholder shows current color.')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.activityColor1)
				.onChange(async (value) => {
					// check if valid hex
					if (!isHexColor(value)) {
						return
					}
					this.plugin.settings.activityColor1 = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Activity 2 Color:')
			.setDesc('Color for low activity. Placeholder shows current color.')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.activityColor2)
				.onChange(async (value) => {
					// check if valid hex
					if (!isHexColor(value)) {
						return
					}
					this.plugin.settings.activityColor2 = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Activity 3 Color:')
			.setDesc('Color for medium activity. Placeholder shows current color.')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.activityColor3)
				.onChange(async (value) => {
					// check if valid hex
					if (!isHexColor(value)) {
						return
					}
					this.plugin.settings.activityColor3 = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Activity 4 Color:')
			.setDesc('Color for highest activity. Placeholder shows current color.')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.activityColor4)
				.onChange(async (value) => {
					// check if valid hex
					if (!isHexColor(value)) {
						return
					}
					this.plugin.settings.activityColor4 = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Text color:')
			.setDesc('Text color. Placeholder shows current color.')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.textColor)
				.onChange(async (value) => {
					// check if valid hex
					if (!isHexColor(value)) {
						return
					}

					this.plugin.settings.textColor = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Empty color:')
			.setDesc('Empty color. Placeholder shows current color.')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.emptyColor)
				.onChange(async (value) => {
					// check if valid hex
					if (!isHexColor(value)) {
						return
					}

					this.plugin.settings.emptyColor = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Cell Radius:')
			.setDesc('Cell Radius. integer, default is 1 = square, the higher the more round.')
			.addText(text => text
				.setPlaceholder(this.plugin.settings.cellRadius)
				.onChange(async (value) => {
					let numValue = parseInt(value)
					// check if valid hex
					if (isNaN(numValue)) {
						return
					}

					this.plugin.settings.cellRadius = Math.abs(numValue);
					await this.plugin.saveSettings();
				}));
	}
}