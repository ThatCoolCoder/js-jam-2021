class FrameRateShower extends wrk.GameEngine.Label {
    frameRateUpdateInterval = 5;
    warningFrameRate = 40;

    constructor(localPosition, localAngle, format) {
        super('frame rate shower', '', localPosition, localAngle, format);

        this.counter = 0; // temporary thing to make frame rate display change every n frames
        this.runningTotal = 0;
    }

    update() {
        var crntFrameRate = 1 / wrk.GameEngine.deltaTime;
        this.runningTotal += crntFrameRate;
        this.counter += 1;

        if (this.counter >= this.frameRateUpdateInterval ||
            crntFrameRate < this.warningFrameRate) {
            this.counter = 0;
            var mean = this.runningTotal / this.frameRateUpdateInterval;
            this.setText(String(wrk.round(mean)));
            this.runningTotal = 0;
        }
    }
}