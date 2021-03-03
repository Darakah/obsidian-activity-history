import type {ActivitySettings} from './types'
import { getTimestamp } from './utils'

export const DEFAULT_SETTINGS: ActivitySettings = {
	firstRun: true,
	initialized: [{path: '/', initialized: false}],
	trackedProjects: ['/'],
	checkpointList: [{path: '/', date: getTimestamp(), size: 0}],
	activityHistory: [{path: '/', size: [{date: getTimestamp(), value: 0}]}],
	activityColor1: '#c6e48b',
	activityColor2: '#7bc96f',
	activityColor3: '#239a3b',
	activityColor4: '#196127',
	textColor: '#000000',
	emptyColor: '#ecedf0',
	cellRadius: 1,
	type: 'yearly'
}