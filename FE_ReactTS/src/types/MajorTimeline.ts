import type { Event } from "../types/event";

export interface MajorTimeline {
    id: number;
    name?: string;
    startYear: number;
    endYear: number;
    description?: string;
    events: Event[];
}
