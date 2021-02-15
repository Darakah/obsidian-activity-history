import { time } from 'console';
import { ItemView, MarkdownView, WorkspaceLeaf, TFile, TagCache, LinkCache, MetadataCache, App, Modal, Notice, Plugin, PluginSettingTab, Setting, Vault } from 'obsidian';

interface ActivitySettings {
	sortDirection: boolean;
	sizeHistory: {};
}

const DEFAULT_SETTINGS: ActivitySettings = {
	sortDirection: true,
	sizeHistory: {}
}

export default class ActivityPlugin extends Plugin {
	settings: ActivitySettings;
	containerEl: HTMLElement;

	async onload() {
		// Load message
		await this.loadSettings();
		console.log('Loaded Activity Plugin');
		this.addCommand({
			id: "Activity",
			name: "Add Vault Activity",
			callback: () => this.addActivity()
		});

		// Determine current day timestamp
		let today = new Date(); 		
		let timestamp = today.getFullYear().toString();
		timestamp += (today.getMonth()+1 < 9 ? '0' : '') + today.getMonth().toString();
		timestamp += ((today.getDate()+1 < 10) ? '0' : '') + today.getDate().toString();
		console.log(timestamp)


		// Create a function from the snippets below
		// add handlers to vault to run function on open / close / delete or modify
		// set debounce for said function to avoid cluttering obsidian

		// Compute vault size
		let vaultSize = 0;
		let vaultMDFiles = this.app.vault.getMarkdownFiles();
		for (let file in vaultMDFiles){
			vaultSize += vaultMDFiles[file].stat.size; 
		}
		console.log(vaultSize)

		// Update size history and save data
		this.settings.sizeHistory[timestamp] = vaultSize; 
		await this.saveSettings();

		// Create function to retrieve for each timestamp the contribution 
		// if timestamp is not present in history set to 0
		// else return difference between current timestamp and the day before it
		// if no day before it keep going back until you find one
		// if none is found set this value to 0 as it would be the first day

		// create Svelte component for contribution board (check the Calendar plugin)

		// 4 handlers
		// move board to next year
		// move board to last year
		// show % activity tooltip when day is hovered on
		// update box colors on refresh or on year change


		// Check folder note author's recent plugin to see how to add 
		// activity block

		this.addSettingTab(new ActivitySettingTab(this.app, this));
	}

	async addActivity() {
		let containerEl = document.createElement('div');
		let activity_box_html = `<div class="graph">
									<ul class="months">
									<li>Jan</li>
									<li>Feb</li>
									<li>Mar</li>
									<li>Apr</li>
									<li>May</li>
									<li>Jun</li>
									<li>Jul</li>
									<li>Aug</li>
									<li>Sep</li>
									<li>Oct</li>
									<li>Nov</li>
									<li>Dec</li>
									</ul>
									<ul class="days">
									<li>Sun</li>
									<li>Mon</li>
									<li>Tue</li>
									<li>Wed</li>
									<li>Thu</li>
									<li>Fri</li>
									<li>Sat</li>
									</ul>
									<ul class="squares">
									<!-- added via javascript -->
									</ul>
								</div>`
		containerEl.innerHTML = activity_box_html;

		// Add the counts to the activity box
		// Add squares
		const squares = containerEl.querySelector('.squares');
		for (var i = 1; i < 365; i++) {

			const level = Math.floor(Math.random() * 3);  
			squares.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);
		}
		this.setLines(this.getEditor(), [containerEl.innerHTML]);
	}

	getEditor(): CodeMirror.Editor {
		let view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!view) return;

		let cm = view.sourceMode.cmEditor;
		return cm;
	}

	getLines(editor: CodeMirror.Editor): string {
		if (!editor) return;
		const selection = editor.getSelection();
		return selection;
	}

	setLines(editor: CodeMirror.Editor, lines: string[]) {
		const selection = editor.getSelection();
		if (selection != "") {
			editor.replaceSelection(lines.join("\n"));
		} else {
			editor.setValue(lines.join("\n"));
		}
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

class ActivitySettingTab extends PluginSettingTab {
	plugin: ActivityPlugin;

	constructor(app: App, plugin: ActivityPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let { containerEl } = this;

		containerEl.empty();
		containerEl.createEl('h2', { text: 'Obsidian Activity Settings' });

		new Setting(containerEl)
			.setName('Chronological Direction')
			.setDesc('Default: OLD -> NEW. Turn this setting off: NEW -> OLD')
			.addToggle((toggle) => {
				toggle.setValue(this.plugin.settings.sortDirection);
				toggle.onChange(async (value) => {
					this.plugin.settings.sortDirection = value;
					await this.plugin.saveSettings();
				});
			})
	}
}
