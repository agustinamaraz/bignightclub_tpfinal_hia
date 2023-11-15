export class Evento {
    kind!: string;
    status!: string;
    summary!: string;
    creator!: { email: string };
    start!: { dateTime: string; timeZone: string };
    end!: { dateTime: string; timeZone: string };
}
