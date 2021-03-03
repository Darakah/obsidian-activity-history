import type { ActivitySettings } from './types';
import ActivityHeatmap from './svelte/ActivityHeatmap.svelte';
import { isTracked, getYearRange, getProjectActivityHistory } from './utils';
import Year from './svelte/Year.svelte';
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';

export class ActivityHistoryProcessor {

	async run(source: string, el: HTMLElement, settings: ActivitySettings) {

		source = source.trim()
		let currentYear = new Date().getFullYear().toString();
		let elCanvas = el.createDiv({ cls: 'ObsidianHistoryBlock' });
		let yearSelect = elCanvas.createDiv({ attr: { id: 'SelectYear' } })
		let boardEL = elCanvas.createDiv({ cls: 'HistoryBoard', attr: { id: 'HistoryBoard' } })

		// Check if project is being tracked
		if (!isTracked(source, settings.trackedProjects)) {
			// Show warning message
			boardEL.setText(`Specified project ${source} is not a tracked project.`)
			return
		}

		// Valid project, add the different svelte component
		// Get year ranges for the specified object
		let yearRange = getYearRange(source, settings.activityHistory)
		// Add current year to the selection
		if (yearRange.every(x => x.year != currentYear)) {
			yearRange.unshift({ year: currentYear })
		}

		// Add svelte year selection element
		new Year({
			props: {
				options: yearRange,
			},
			target: yearSelect
		});

		// Get activity history for specified project
		let activity = getProjectActivityHistory(source, settings.activityHistory)?.size
		// if no activity history available add placeholder
		if (!activity) {
			activity = [{ date: `${currentYear}-01-01`, value: 0 }]
		}

		// Add svelte activity heatmap element
		new ActivityHeatmap({
			props: {
				year: new Date().getFullYear().toString(),
				data: activity,
				colors: [settings.activityColor1, settings.activityColor2, settings.activityColor3, settings.activityColor4],
				textColor: settings.textColor,
				emptyColor: settings.emptyColor,
				cellRadius: settings.cellRadius,
				type: settings.type
			},
			target: boardEL
		});

		// Add listener to update heatmap on Year Selection change
		yearSelect.addEventListener('change', (event) => {
			// Get selected year
			let selectOption = yearSelect.querySelectorAll('option:checked')[0].innerHTML;

			// Update the activity heatmap
			boardEL.empty();

			new ActivityHeatmap({
				props: {
					year: selectOption,
					data: activity,
					colors: [settings.activityColor1, settings.activityColor2, settings.activityColor3, settings.activityColor4],
					textColor: settings.textColor,
					emptyColor: settings.emptyColor,
					cellRadius: settings.cellRadius
				},
				target: boardEL
			});
		});

		el.appendChild(elCanvas);
	}
}