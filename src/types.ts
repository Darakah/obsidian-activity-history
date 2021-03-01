export interface Checkpoint {
	path: string,
	date: string,
	size: number
}

export interface Year {
	year: string
}

export interface DayActivity {
	date: string,
	value: number
}

export interface InitializedProject {
	path: string,
	initialized: boolean
}

export interface ActivityHistory {
	path: string,
	size: DayActivity[]
}

export interface ActivitySettings {
	firstRun: boolean,
	initialized: InitializedProject[],
	trackedProjects: string[],
	checkpointList: Checkpoint[],
	activityHistory: ActivityHistory[],
	activityColor1: string,
	activityColor2: string,
	activityColor3: string,
	activityColor4: string,
	textColor: string,
	emptyColor: string,
	cellRadius: number
}