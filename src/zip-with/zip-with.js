const zipWith = (fn, arr1, arr2) => {
    const length = Math.min(arr1.length, arr2.length)

    return [...Array(length).keys()]
        .map( v => fn(arr1[v], arr2[v]))
}

console.log(zipWith( Math.pow, [10,10,10,10], [0,1,2,3] ) )
console.log(zipWith( Math.max, [1,4,7,1,4,7], [4,7,1,4,7,1] ))
