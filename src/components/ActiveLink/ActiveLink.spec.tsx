import { render } from "@testing-library/react"
import { isResSent } from "next/dist/shared/lib/utils";
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

describe('ActiveLink component', () => {
    it('correctly renders', () => {
        const { getByText } = render(
            <ActiveLink href='/' activeClassName='active'>
                <a>Home</a>
            </ActiveLink>,
            );

        expect(getByText('Home')).toBeInTheDocument();
    });

    it('adds active class if the link as currently active', () => {
        const { getByText } = render(
            <ActiveLink href='/' activeClassName='active'>
                <a>Home</a>
            </ActiveLink>,
            );
        expect(getByText('Home')).toHaveClass('active');
    });
    // usando it você pode usar uma frase
});


