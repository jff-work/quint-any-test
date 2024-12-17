module simpleCounter {
    // State variable to track our count
    var count: int

    // Initialize the counter to 0
    action init = {
        count' = 0
    }

    // Increment the counter by 1
    action increment = {
        count' = count + 1
    }

    action dothecount = {
        init.then(10.reps(_ => increment))
    }

    // Run the counter for exactly 10 steps
    run countToTen = {
        dothecount
    }
}
