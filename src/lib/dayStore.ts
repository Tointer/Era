import { writable, derived } from 'svelte/store';
import { cleanDate } from './dateUtils';
import store from 'store2';
import EventEmitter from "eventemitter3";

export const EE = new EventEmitter();

const tagKey = 'tag';
const dayDataChangeKey = "dayChange:"

function createDayStore() {
	const { subscribe, set, update } = writable(cleanDate(new Date()));

	return {
		subscribe,
		select: (newDate: Date) => {
            update(() => cleanDate(newDate))
            EE.emit("selectedDayChanged", cleanDate(newDate));
        },
		reset: () => set(cleanDate(new Date()))
	};
}


export function setDayTag(date: Date, tag: string) {
    console.log("setDayTag", date, tag)
    const key = {date, key: tagKey};
    store.set(key, tag);
    
    EE.emit(dayDataChangeKey+tagKey, {date: cleanDate(date), tag});
    console.log("emit", dayDataChangeKey+tagKey, {date: cleanDate(date), tag});
}

export function getDayTag(date: Date) {
    const key = {date, key: tagKey};
    return store.get(key);
}

export const selectedDay = createDayStore();

