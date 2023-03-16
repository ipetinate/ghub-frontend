module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
    transformIgnorePatterns: ['node_modules'],
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                isolatedModules: true,
                tsConfig: 'tsconfig.jest.json',
                diagnostics: true
            }
        ],
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/test/fileTransformer.js'
    },
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1'
    }
}
