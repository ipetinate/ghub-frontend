/* Make react global to components inside jest */

import React from 'react'

global.React = React

/* Add assertions methods */

import '@testing-library/jest-dom'

/* Next.js setup for Jest */

const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

module.exports = createJestConfig()
/* Mock Next components and router */

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        return <img {...props} />
    }
}))
