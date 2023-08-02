export enum LogLevel {
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error',
}

export interface LoggerSubscriber {
    notify(level: LogLevel, data: string): void;
}

// PATTERN:{Observer}
export class LoggerObserver {
    private subscribers: LoggerSubscriber[] = [];

    addObserver(subscriber: LoggerSubscriber) {
        this.subscribers.push(subscriber);
    }

    log(level: LogLevel, data: string) {
        this.subscribers.forEach((subscriber) => subscriber.notify(level, data));
    }
}
