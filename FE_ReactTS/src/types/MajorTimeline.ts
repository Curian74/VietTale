import type { Event } from "./event";

export interface MajorTimeline {
    id: number;
    name?: string;
    startYear: number;
    endYear: number;
    description?: string;
    events: Event[];
}
