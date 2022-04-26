import { render, screen } from "@testing-library/react"
import { ActiveLink } from "."

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/',
            };
        },
    };
});

test('correctly renders', () => {
    render(<ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
    </ActiveLink>,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
});
