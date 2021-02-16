import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FormCreatePost from '../../../components/FormCreatePost/FormCreatePost';
import { setupServer } from 'msw/node';
import { rest } from 'msw'

const server = setupServer(
    rest.post('/login', (req, res, ctx) => res(ctx.status(201))),
)
beforeAll(() => server.listen())

afterAll(() => server.close())

beforeEach(() => render(<FormCreatePost />))
describe('when the form is mounted', () => {

    test('should exists the fields: titulo, Post', () => {
        expect(screen.getByLabelText(/Titulo/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Post/i)).toBeInTheDocument()
    })
    test('should existst the submit button', () => {
        expect(screen.getByRole('button', { name: /Guardar/i })).toBeInTheDocument()
    })
})
describe('when the user submits the form', () => {
    test('should the submit button be disabled until the request is done', async () => {
        expect(screen.getByRole('button', { name: /Guardar/i })).not.toBeDisabled()
        fireEvent.click(screen.getByRole('button', { name: /Guardar/i }))
        expect(screen.getByRole('button', { name: /Guardar/i })).toBeInTheDocument()
        await waitFor(() =>
            expect(screen.getByRole('button', { name: /Guardar/i })).not.toBeDisabled(),
        )
        //fireEvent.click(screen.getByRole('button', { name: /Continuar/i }))

    })
})

describe('when the user submits the form without values', () => {
    it('should display validation messages', () => {
        expect(screen.queryByText(/Escriba un titulo/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/Escriba un post/i)).not.toBeInTheDocument()

        // fireEvent.click(screen.getByRole('button', { name: /guardar/i })

    })
})