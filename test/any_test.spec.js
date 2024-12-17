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
        it(`should run ${name} test multiple times and measure performance`, function() {
            const iterations = 10;
            const results = [];

            for (let i = 0; i < iterations; i++) {
                const start = process.hrtime();
                
                // Run the Quint test using the correct command format
                const output = execSync(
                    `echo '${name}' | quint -r any_test.qnt::anyTest --verbosity=3`,
                    { cwd: path.resolve(__dirname, '..') }
                ).toString();

                const [seconds, nanoseconds] = process.hrtime(start);
                const duration = seconds * 1000 + nanoseconds / 1000000; // Convert to milliseconds
                
                results.push(duration);

                // Verify the test result
                expect(output.includes('true')).to.equal(expectedResult);
            }

            // Calculate statistics
            const avg = results.reduce((a, b) => a + b, 0) / results.length;
            const min = Math.min(...results);
            const max = Math.max(...results);

            console.log(`\nPerformance results for ${name}:`);
            console.log(`  Average: ${avg.toFixed(2)}ms`);
            console.log(`  Min: ${min.toFixed(2)}ms`);
            console.log(`  Max: ${max.toFixed(2)}ms`);
        });
    });
});