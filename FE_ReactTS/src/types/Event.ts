export interface Event {
    id: number;
    title: string;
    description: string;
    eventTime: string;
    thumbnail?: string;
    eventTags?: { id: number; tagName: string }[];
    eventsImages?: { id: number; url: string }[];
}