function solution(romanString) {
    const romanMap = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    const parse = (roman) => {
        if (romanString.length > 0) {
            return romanMap[roman[0]]
        } else {
            return 0
        }
    }

    const accumulator = (prev, curr, idx, arr) => {
        if (curr > arr[Math.max(0, idx - 1)]) {
            return prev + (curr - 2 * (arr[Math.max(0, idx - 1)]))
        } else {
            return prev + curr
        }
    }

    return [...romanString]
        .map( char => parse(char))
        .reduce( accumulator )
}
