import React from 'react'

// Create input component based on prop variant
export function VariantInput(inputProps) {
    const { inputVariant, ...other } = inputProps
    const InputVariant = inputVariant
    return (
        <InputVariant {...other} />
    )
}

// Create sorted aray
export function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}

// Get sorting
function desc(a, b, orderBy) {
    if (a[orderBy] === null) { a[orderBy] = '' }
    if (b[orderBy] === null) { b[orderBy] = '' }
    if (b[orderBy].toLowerCase() < a[orderBy].toLowerCase()) {
        return -1
    }
    if (b[orderBy].toLowerCase() > a[orderBy].toLowerCase()) {
        return 1
    }
    return 0
}
export function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}