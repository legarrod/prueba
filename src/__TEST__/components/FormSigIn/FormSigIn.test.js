import { render, screen, fireEvent } from '@testing-library/react';
import FormSigIn from '../../../components/FormSigIn/FormSigIn';

describe('when the form is mounted', () => {
    beforeEach(() => render(<FormSigIn />))
    test('renders home', () => {
        const linkElement = screen.getByText(/Registrar/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('should exists the fields: Correo electrónico, Contraseña', () => {
        expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Apellidos/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Corre/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument()
    })
    test('should existst the submit button', () => {
        expect(screen.getByRole('button', { name: /Registrar/i })).toBeInTheDocument()
    })
})
