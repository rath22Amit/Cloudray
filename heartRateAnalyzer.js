const fs = require('fs');

class HeartRateAnalyzer {
    constructor(dataFilePath) {
        this.dataFilePath = dataFilePath;
    }

    calculateStatistics() {
        const heartRateData = JSON.parse(fs.readFileSync(this.dataFilePath, 'utf8'));
        const results = [];

        
        const dataByDay = {};
        heartRateData.forEach(measurement => {
            const date = measurement.timestamps.startTime.split('T')[0];
            if (!dataByDay[date]) {
                dataByDay[date] = [];
            }
            dataByDay[date].push(measurement);
        });

        
        for (const date in dataByDay) {
            const measurements = dataByDay[date];
            const minBpm = Math.min(...measurements.map(measurement => measurement.beatsPerMinute));
            const maxBpm = Math.max(...measurements.map(measurement => measurement.beatsPerMinute));
            const sortedBpm = measurements.map(measurement => measurement.beatsPerMinute).sort((a, b) => a - b);
            const medianBpm = sortedBpm[Math.floor(sortedBpm.length / 2)];
            const latestTimestamp = new Date(Math.max(...measurements.map(measurement => new Date(measurement.timestamps.endTime)))).toISOString();

            
            results.push({
                date,
                min: minBpm,
                max: maxBpm,
                median: medianBpm,
                latestDataTimestamp: latestTimestamp
            });
        }

        return results;
    }

    writeOutputToFile(outputFilePath, results) {
        fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 4));
    }
}

module.exports = HeartRateAnalyzer;