function incrementString(s) {
    const string = String(s)
    const firstNonNumeric = [...string].reverse().findIndex(v => /[^0-9]+/.test(v))

    if (firstNonNumeric === 0) {
        return string + 1
    }

    const indexOfFirstNonNumeric = firstNonNumeric < 0 ? 0 : string.length - firstNonNumeric;

    return string.substring(0, indexOfFirstNonNumeric)
        + incrementNumber(string.substring(indexOfFirstNonNumeric))
}

function incrementNumber(s) {
    const string = s === '' ? '0' : s

    const numbers = [...string]
        .map( (v, i) => i === string.length - 1 ? Number(v) + 1 : Number(v))

    if (numbers[numbers.length - 1] > 9) {
        return incrementNumber(string.substring(0, string.length - 1)) + '0'
    } else {
        return numbers.reduce( (prev, curr) => `${prev}${String(curr)}`, '')
    }
}

console.log(incrementString(''))
console.log(incrementString('1'))
console.log(incrementString('0'))
console.log(incrementString('FOO'))
console.log(incrementString('FOO1'))
console.log(incrementString('FOO01'))
console.log(incrementString('FOO00000099999'))
console.log(incrementString('FOO00000099999b9'))
console.log(incrementString('FOO00000099999b89'))
console.log(incrementString('9f234b33221a91n15'))
