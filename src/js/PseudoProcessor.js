import Process from './process.js';

class PseudoProcessor {
    constructor (cycles) {
        this._cycles = cycles;
        this._stack = [];
    }

    startProcessing = () => {
        let emptyTimes = 0;
        let maxStackLength = 0;
        let attendedProcess = 0;
        let currentProcess = undefined;
        this._stack = [];

        for (let i = 0; i < this._cycles; i++) {
            this._spawnProcess();
            if (currentProcess !== undefined) {
                if (currentProcess.remainingCycles !== 0) {
                    currentProcess.remainingCycles--;

                } else {
                    attendedProcess++;
                    currentProcess = this._stack.shift();
                }
            } else {
                emptyTimes++;
                currentProcess = this._stack.shift();
            }

            if (this._stack.length > maxStackLength) {
                maxStackLength = this._stack.length;
            }


        }
        let remainingProcess = this._stack.length;
        let remainingCycles = this._stack.reduce((accumulator, currentValue) => accumulator + currentValue.remainingCycles, 0);
        let result = {
            emptyTimes,
            maxStackLength,
            remainingCycles,
            remainingProcess,
            attendedProcess,
        }

        return result;
    };

    _spawnProcess = () => {
        let probability = Math.ceil(Math.random() * 100);
        if (probability <= 39) {
            this._stack.push(new Process());
        }
    }
}

export default PseudoProcessor;