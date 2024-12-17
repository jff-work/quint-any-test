module anyTest {
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

    action wait = {
        init.then(10.reps(i => increment))
    }

    action a1 = {
        wait
    }

    action a2 = {
        wait
    }

    action a3 = {
        wait
    }

    action a4 = {
        wait
    }

    action a5 = {
        wait
    }

    action a6 = {
        wait
    }

    action a7 = {
        wait
    }

    action a8 = {
        wait
    }

    run allAny = {
        any {
            a1,
            a2,
            a3,
            a4, 
            a5,
            a6,
            a7,
            a8,
        }
    }

    run allFalse = {
        any {
            a5,
            a6,
            a7,
            a8,
        }
    }

    run oneTrue = {
        any {
            a4,
            a5,
            a6,
            a7,
            a8,
        }
    }

    run twoTrue = {
        any {
            a1,
            a2,
            a5,
            a6,
            a7,
            a8,
        }
    }
}   
