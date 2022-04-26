import { render, screen } from "@testing-library/react"
import { isResSent } from "next/dist/shared/lib/utils";
import { Header } from "."

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/',
            };
        },
    };
});

describe('Header component', () => {
    it('correctly renders', () => {
        const { getByText, getByAltText } = render(<Header />);

        screen.logTestingPlaygroundURL();

        expect(getByText('Home')).toBeInTheDocument();
        expect(getByText('Posts')).toBeInTheDocument();
        expect(getByAltText('DevNews!')).toBeInTheDocument();
    });
    
});


