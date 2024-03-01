const HeartRateAnalyzer = require('./heartRateAnalyzer');

const heartRateAnalyzer = new HeartRateAnalyzer('heartrate.json');
const results = heartRateAnalyzer.calculateStatistics();
heartRateAnalyzer.writeOutputToFile('output.json', results);
console.log('Results generated in output.json file');