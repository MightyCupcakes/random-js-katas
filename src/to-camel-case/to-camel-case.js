function toCamelCase(str){
    return [...str.split(/[_-]/)]
        .map( (v, i) => i === 0 ? v : v.substring(0, 1).toUpperCase() + v.substring(1))
        .reduce( (prev , curr) => prev + curr, '')
}

console.log(toCamelCase('the-stealth-warrior'))
console.log(toCamelCase('The_Stealth_Warrior'))
console.log(toCamelCase('The_Stealth-Warrior'))
console.log(toCamelCase('The_Stealth--Warrior'))
