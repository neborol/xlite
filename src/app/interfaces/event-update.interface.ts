export interface IEventUpdateObject {
    eventId: number;
    title: string;
    description: string;
    time: string;
    eventDate: Date;
    venue: string;
    comment?: string;
}
