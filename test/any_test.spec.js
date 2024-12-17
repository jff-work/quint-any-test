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
            const quintLogs = [];
            const quintTestLogs = [];

            console.log(`\nRunning test case: ${name}`);

            // Test original quint
            for (let i = 0; i < iterations; i++) {
                console.log(`\nQuint iteration ${i + 1}/${iterations}:`);
                const start = process.hrtime();
                
                try {
                    const output = execSync(
                        `echo '${name}' | quint -r any_test.qnt::anyTest --verbosity=3`,
                        { cwd: path.resolve(__dirname, '..') }
                    ).toString();

                    const [seconds, nanoseconds] = process.hrtime(start);
                    const duration = seconds * 1000 + nanoseconds / 1000000;
                    
                    quintResults.push(duration);
                    quintLogs.push({
                        iteration: i + 1,
                        duration,
                        output: output.trim(),
                        success: output.includes('true') === expectedResult
                    });

                    console.log('Output:', output.trim());
                    console.log(`Duration: ${duration.toFixed(2)}ms`);
                    expect(output.includes('true')).to.equal(expectedResult);
                } catch (error) {
                    console.error(`Error in Quint iteration ${i + 1}:`, error.toString());
                    quintLogs.push({
                        iteration: i + 1,
                        error: error.toString()
                    });
                    throw error;
                }
            }

            // Test quint-test
            for (let i = 0; i < iterations; i++) {
                console.log(`\nQuint-test iteration ${i + 1}/${iterations}:`);
                const start = process.hrtime();
                
                try {
                    const output = execSync(
                        `echo '${name}' | quint-test -r any_test.qnt::anyTest --verbosity=3`,
                        { cwd: path.resolve(__dirname, '..') }
                    ).toString();

                    const [seconds, nanoseconds] = process.hrtime(start);
                    const duration = seconds * 1000 + nanoseconds / 1000000;
                    
                    quintTestResults.push(duration);
                    quintTestLogs.push({
                        iteration: i + 1,
                        duration,
                        output: output.trim(),
                        success: output.includes('true') === expectedResult
                    });

                    console.log('Output:', output.trim());
                    console.log(`Duration: ${duration.toFixed(2)}ms`);
                    expect(output.includes('true')).to.equal(expectedResult);
                } catch (error) {
                    console.error(`Error in Quint-test iteration ${i + 1}:`, error.toString());
                    quintTestLogs.push({
                        iteration: i + 1,
                        error: error.toString()
                    });
                    throw error;
                }
            }

            // Calculate statistics
            const quintAvg = quintResults.reduce((a, b) => a + b, 0) / quintResults.length;
            const quintMin = Math.min(...quintResults);
            const quintMax = Math.max(...quintResults);

            const quintTestAvg = quintTestResults.reduce((a, b) => a + b, 0) / quintTestResults.length;
            const quintTestMin = Math.min(...quintTestResults);
            const quintTestMax = Math.max(...quintTestResults);

            const avgDiff = ((quintTestAvg - quintAvg) / quintAvg * 100).toFixed(2);
            const minDiff = ((quintTestMin - quintMin) / quintMin * 100).toFixed(2);
            const maxDiff = ((quintTestMax - quintMax) / quintMax * 100).toFixed(2);

            // Log detailed results
            console.log(`\nDetailed results for ${name}:`);
            console.log('\nQuint runs:');
            quintLogs.forEach(log => {
                console.log(`\nIteration ${log.iteration}:`);
                if (log.error) {
                    console.log('Error:', log.error);
                } else {
                    console.log(`Duration: ${log.duration.toFixed(2)}ms`);
                    console.log(`Success: ${log.success}`);
                    console.log('Output:', log.output);
                }
            });

            console.log('\nQuint-test runs:');
            quintTestLogs.forEach(log => {
                console.log(`\nIteration ${log.iteration}:`);
                if (log.error) {
                    console.log('Error:', log.error);
                } else {
                    console.log(`Duration: ${log.duration.toFixed(2)}ms`);
                    console.log(`Success: ${log.success}`);
                    console.log('Output:', log.output);
                }
            });

            // Log summary statistics
            console.log('\nSummary Statistics:');
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