import { LogLevel, LoggerSubscriber } from '../observer';
import * as fs from 'fs';
// PATTERN:{Observer}
export class FileLoggerSubscriber implements LoggerSubscriber {
    private filename: string;

    constructor(filename: string) {
        this.filename = filename;
    }

    private getCurrentDateTime(): string {
        const now = new Date();
        return now.toISOString();
    }

    notify(level: LogLevel, data: string) {
        const logLine = `${this.getCurrentDateTime()} | ${level} | ${data}\n`;

        fs.appendFile(this.filename, logLine, (error) => {
            if (error) {
                throw new Error('failed to write log');
            }
        });
    }
}
