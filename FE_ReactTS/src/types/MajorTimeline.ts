import type { Event } from "./Event";

export interface MajorTimeline {
    id: number;
    name?: string;
    startYear: number;
    endYear: number;
    description?: string;
    events: Event[];
}
