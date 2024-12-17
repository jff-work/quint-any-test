module anyTest {

    action a1 = {
        true
    }

    action a2 = {
        true
    }

    action a3 = {
        true
    }

    action a4 = {
        true
    }

    action a5 = {
        false
    }

    action a6 = {
        false
    }

    action a7 = {
        false
    }

    action a8 = {
        false
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
