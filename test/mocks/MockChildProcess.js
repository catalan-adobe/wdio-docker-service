import { EventEmitter } from 'events';
import { Readable } from 'stream';
import { spy } from 'sinon';

class MockChildProcess extends EventEmitter {
    constructor(cmd, args = []) {
        super();

        this.cmd = cmd;
        this.args = args;

        this.stdout = new Readable({
            read() {
                this.push(null);
            }
        });

        this.stderr = new Readable({
            read() {
                this.push(null);
            }
        });

        this.kill = spy();
    }

    mockError(error = 'mock error') {
        this.emit('error', new Error(error));
    }

    mockClose(code = 0) {
        this.emit('close', code);
    }
}

export default MockChildProcess;
