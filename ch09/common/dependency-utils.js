/**
 * Compute the dependency order of the given `things`, computing dependencies with the given `dependenciesFunction`.
 * @returns An array of the same things (assuming the things is its own transitive closure of the dependencies),
 *  but in dependency order, or false when there's a cycle.
 */
const dependencyOrderOf = (things, dependenciesFunction) => {
    const ordered = []

    const visit = (current, chain) => {
        if (ordered.indexOf(current) > -1) {
            return false
        }
        if (chain.indexOf(current) > -1) {
            return true
        }
        const extendedChain = [ ...chain, current ]
        const hasCycle = dependenciesFunction(current).some(
            (dependency) => visit(dependency, extendedChain)
        )
        ordered.push(current)
        return hasCycle
    }

    const hasCycle = things.some(
        (thing) => visit(thing, [])
    )

    return hasCycle ? false : ordered     // equivalent to: !hasCycle && ordered
}
module.exports.dependencyOrderOf = dependencyOrderOf


/**
 * Compute whether there's a cycle of dependencies, starting with `thing` and computing dependencies with the given `dependenciesFunction`.
 * @returns An array with a cycle of "things", starting at the given `thing`.
 *  An array of length 0 means: the given `thing` is not part of any cycle.
 */
const cycleWith = (thing, dependenciesFunction) => {

    const visit = (current, chain) => {
        if (chain.indexOf(current) > -1) {
            // Add current to end, so we know what sub-array constitutes the actual cycle:
            return [ ...chain, current ]
        }
        const extendedChain = [ ...chain, current ]
        for (const dependency of dependenciesFunction(current)) {
            const recursion = visit(dependency, extendedChain)
            if (recursion.length > 0) {
                return recursion
            }
        }
        return []
    }

    const result = visit(thing, [])
    return result.length > 0 && result[result.length - 1] === thing ? result : []
}
module.exports.cycleWith = cycleWith

