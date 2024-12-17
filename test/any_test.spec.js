const { expect } = require('chai');
const { execSync } = require('child_process');
const path = require('path');

describe('Quint Any Tests Benchmarking', function() {
    // Increase timeout for longer running tests
    this.timeout(10000);

    const testCases = [
        { name: 'allAny', expectedResult: true },
        { name: 'allFalse', expectedResult: false },
        { name: 'oneTrue', expectedResult: true },
        { name: 'twoTrue', expectedResult: true }
    ];

    testCases.forEach(({ name, expectedResult }) => {
        it(`should run ${name} test multiple times and compare quint vs quint-test performance`, function() {
            const iterations = 10;
            const quintResults = [];
            const quintTestResults = [];

            // Test original quint
            for (let i = 0; i < iterations; i++) {
                const start = process.hrtime();
                
                const output = execSync(
                    `echo '${name}' | quint -r any_test.qnt::anyTest --verbosity=3`,
                    { cwd: path.resolve(__dirname, '..') }
                ).toString();

                const [seconds, nanoseconds] = process.hrtime(start);
                const duration = seconds * 1000 + nanoseconds / 1000000;
                
                quintResults.push(duration);
                expect(output.includes('true')).to.equal(expectedResult);
            }

            // Test quint-test
            for (let i = 0; i < iterations; i++) {
                const start = process.hrtime();
                
                const output = execSync(
                    `echo '${name}' | quint-test -r any_test.qnt::anyTest --verbosity=3`,
                    { cwd: path.resolve(__dirname, '..') }
                ).toString();

                const [seconds, nanoseconds] = process.hrtime(start);
                const duration = seconds * 1000 + nanoseconds / 1000000;
                
                quintTestResults.push(duration);
                expect(output.includes('true')).to.equal(expectedResult);
            }

            // Calculate statistics for quint
            const quintAvg = quintResults.reduce((a, b) => a + b, 0) / quintResults.length;
            const quintMin = Math.min(...quintResults);
            const quintMax = Math.max(...quintResults);

            // Calculate statistics for quint-test
            const quintTestAvg = quintTestResults.reduce((a, b) => a + b, 0) / quintTestResults.length;
            const quintTestMin = Math.min(...quintTestResults);
            const quintTestMax = Math.max(...quintTestResults);

            // Calculate differences
            const avgDiff = ((quintTestAvg - quintAvg) / quintAvg * 100).toFixed(2);
            const minDiff = ((quintTestMin - quintMin) / quintMin * 100).toFixed(2);
            const maxDiff = ((quintTestMax - quintMax) / quintMax * 100).toFixed(2);

            console.log(`\nPerformance results for ${name}:`);
            console.log('\nQuint (original):');
            console.log(`  Average: ${quintAvg.toFixed(2)}ms`);
            console.log(`  Min: ${quintMin.toFixed(2)}ms`);
            console.log(`  Max: ${quintMax.toFixed(2)}ms`);
            
            console.log('\nQuint-test:');
            console.log(`  Average: ${quintTestAvg.toFixed(2)}ms`);
            console.log(`  Min: ${quintTestMin.toFixed(2)}ms`);
            console.log(`  Max: ${quintTestMax.toFixed(2)}ms`);

            console.log('\nDifference (% change):');
            console.log(`  Average: ${avgDiff}%`);
            console.log(`  Min: ${minDiff}%`);
            console.log(`  Max: ${maxDiff}%`);
        });
    });
});