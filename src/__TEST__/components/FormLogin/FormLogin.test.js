import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormLogion from '../../../components/FormLogin/FormLogin';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
    rest.post('/login', (req, res, ctx) => res(ctx.status(201))),
)

beforeAll(() => server.listen())


afterAll(() => server.close())

beforeEach(() => render(<FormLogion />))

describe('when the form is mounted', () => {

    test('renders home', () => {
        const linkElement = screen.getByText(/Ingresar/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('should exists the fields: Correo electrónico, Contraseña', () => {
        expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument()
    })
    test('should existst the submit button', () => {
        expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument()
    })
})

describe('when the user submits the form', () => {
    test('should the submit button be disabled until the request is done', async () => {
        expect(screen.getByRole('button', { name: /Ingresar/i })).not.toBeDisabled()

        fireEvent.click(screen.getByRole('button', { name: /Ingresar/i }))

        expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument()

        await waitFor(() =>
            expect(screen.getByRole('button', { name: /Ingresar/i })).not.toBeDisabled(),
        )
    })
})