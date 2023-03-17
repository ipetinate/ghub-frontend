import { NextRouter } from 'next/router'

export function createRouterMock(router: Partial<NextRouter>): NextRouter {
    return {
        route: '/',
        asPath: '/',
        basePath: '',
        pathname: '/',
        defaultLocale: 'en',
        query: {},
        domainLocales: [],
        back: jest.fn(),
        push: jest
            .fn()
            .mockImplementation((path: string) =>
                window?.history?.pushState({}, 'Test', path)
            ),
        reload: jest.fn(),
        replace: jest.fn(),
        forward: jest.fn(),
        prefetch: jest.fn(),
        beforePopState: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn()
        },
        isReady: true,
        isPreview: false,
        isFallback: false,
        isLocaleDomain: false,
        ...router
    }
}
