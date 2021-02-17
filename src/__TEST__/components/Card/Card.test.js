import { render, screen } from '@testing-library/react';
import BooksCards from '../../../components/Cards/Cards';


beforeEach(() => render(<BooksCards />))

describe('when the bookcards is mounted', () => {
    test('expected to have an element with id title', () => {

        expect(screen.findByTitle(/title/i)).toBeTruthy();
    });
    test('expected to have share, show more and favorites buttons', () => {
        expect(screen.queryByTestId('button', { name: /show more/i })).toBeDefined();
        expect(screen.queryByTestId('button', { name: /share/i })).toBeDefined();
        expect(screen.queryByTestId('button', { name: /add to favorites/i })).toBeDefined();
    });

})