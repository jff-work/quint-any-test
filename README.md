# Quint Any Operator Test Benchmark
This repository contains analysis and test benchmarks for evaluating an alternative implementation of the `any` operator in Quint. This project was created as part of a one-day technical demonstration for the Informal Systems team.

## Project Status
Completed

### Results:
- I implemented a different algorithm for the `any` operator, which is faster than the original implementation.
https://github.com/informalsystems/quint/compare/main...jff-work:quint-sim-test:main#diff-46f5fcfb3aa2296ff9f3d8b6b274b254bde7f3f20dc30f1e656d461e084d2559

- I created a simple test suite to compare the performances of the two, the new one was faster. The tests were very basic, had I had more time I would make the Quint tests more complex to get a better picture of what's going on.

- I reasoned about the probability situation and came to the conclusion that, as long as a randomisation is applied first, the probability of returning any true value remains the same because of the symmetry of the problem. See the very shitty formatted proof I created with an LLM below if you want more information.
https://github.com/jff-work/quint-any-test/blob/main/proof.md

### Completed
- Created basic test suite for the `any` operator

### Todo
- [x] Implement the new `any` operator
- [x] Adapt the test suite to work with the new Quint version
- [ ] Create a more comprehensive test suite

### Future Enhancements
- [ ] Add graphical analysis of results
- [ ] Implement direct Quint integration (without CLI)
- [x] Add probabilistic analysis of results
- [ ] Set up Docker container for running tests in isolation
