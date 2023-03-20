import { vi } from 'vitest'
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
        back: vi.fn(),
        push: vi
            .fn()
            .mockImplementation((path: string) =>
                window?.history?.pushState({}, 'Test', path)
            ),
        reload: vi.fn(),
        replace: vi.fn(),
        forward: vi.fn(),
        prefetch: vi.fn(),
        beforePopState: vi.fn(),
        events: {
            on: vi.fn(),
            off: vi.fn(),
            emit: vi.fn()
        },
        isReady: true,
        isPreview: false,
        isFallback: false,
        isLocaleDomain: false,
        ...router
    }
}
