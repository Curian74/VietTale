import type { Event } from "../types/Event";

export interface MajorTimeline {
    id: number;
    name?: string;
    startYear: number;
    endYear: number;
    description?: string;
    events: Event[];
}
