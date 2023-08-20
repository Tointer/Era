import { writable } from 'svelte/store';

function cleanDate(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function createDayStore() {
	const { subscribe, set, update } = writable(cleanDate(new Date()));

	return {
		subscribe,
		select: (newDate: Date) => update(() => cleanDate(newDate)),
		reset: () => set(cleanDate(new Date()))
	};
}

export const selectedDay = createDayStore();

