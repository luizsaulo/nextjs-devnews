import { render } from "@testing-library/react"
import Home from "../../../pages";


describe('Home page', () => {
    it('correctly renders', () => {
        const { getByText, getByAltText, debug } = render(<Home />);

        debug();

        expect(getByText('Olá Dev!')).toBeInTheDocument();        
        expect(getByAltText('Home image!')).toBeInTheDocument();
    });    
});


