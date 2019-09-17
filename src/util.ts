type Nullable<T> = null | T

export const nullableMap = <T, U> (x: Nullable<T>, f: (x: T) => U): Nullable<U> => x === null ? null : f(x)

export const mapWithContext = <T, U> (xs: Array<T>, f: (x: T, previous: null | T, next: null | T) => U): Array<U> => {
    return xs.map((x, i, xs) => {
        const previous = i > 0 ? xs[i - 1] : null
        const next = i < xs.length - 1 ? xs[i + 1] : null

        return f(x, previous, next)
    })
}



