import { LogLevel, LoggerSubscriber } from '../observer';

// PATTERN:{Observer}
export class ConsoleLoggerSubscriber implements LoggerSubscriber {
    notify(level: LogLevel, data: string) {
        if (level === LogLevel.ERROR) {
            console.error(data);
        }
    }
}
