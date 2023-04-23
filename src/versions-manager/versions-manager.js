const modifyMajor = ({major}) => ({major: major + 1, minor: 0, patch: 0})
const modifyMinor = ({major, minor}) => ({major, minor: minor + 1, patch: 0})
const modifyPatch = ({major, minor, patch}) => ({major, minor, patch: patch + 1})

function VersionManager(major, minor, patch) {
    this._version = {
        major, minor, patch
    }

    this._actions = [];

    this.major = function () {
        this._actions.push(modifyMajor)
        return this
    }

    this.minor = function () {
        this._actions.push(modifyMinor)
        return this
    }

    this.patch = function () {
        this._actions.push(modifyPatch)
        return this
    }

    this.rollback = function () {
        if (this._actions.length === 0) {
            throw new Error("Cannot rollback!")
        }

        this._actions.pop()
        return this;
    }

    this.release = function () {
        const releaseVersion = this._actions.reduce((prev, curr) => curr(prev), this._version)
        return `${releaseVersion.major}.${releaseVersion.minor}.${releaseVersion.patch}`
    }
}

const vm = initial => {
    if (!initial) {
        return new VersionManager(0, 0, 1)
    }

    const parseVersionString = version => {
        if (!version) {
            return undefined
        }

        const versionNumbers = [...version.split('.'), '0', '0']
            .filter((v, i) => i < 3)
            .map(value => !/[^0-9]+/.test(value) ? Number.NaN : Number(v))

        if (versionNumbers.some(v => isNaN(v))) {
            throw new Error('Error occured while parsing version!')
        }

        return versionNumbers
    }

    return new VersionManager(...parseVersionString(initial))
}

console.log(
    vm()
        .major()
        .major().minor().patch().patch()
        .major().minor().patch()
        .release()) // 3.1.1

console.log(
    vm()
        .major()
        .major().minor().patch().patch()
        .major().minor().patch()
        .rollback().rollback().rollback()
        .release()) // 2.1.2

console.log(
    vm('1')
        .minor().patch().patch()
        .release()) // 1.1.2

console.log(
    vm('1.5')
        .minor().patch().patch()
        .release()) // 1.6.2

console.log(
    vm('1.5.123')
        .patch().patch()
        .release()) // 1.5.125

console.log(
    vm('1.5.19.32121')
        .patch().patch()
        .release()) // 1.5.21
