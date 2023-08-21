import { writable } from 'svelte/store';
import { cleanDate } from './dateUtils';

function createDayStore() {
	const { subscribe, set, update } = writable(cleanDate(new Date()));

	return {
		subscribe,
		select: (newDate: Date) => update(() => cleanDate(newDate)),
		reset: () => set(cleanDate(new Date()))
	};
}

export const selectedDay = createDayStore();

