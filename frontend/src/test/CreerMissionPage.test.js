import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreerMissionPage from '../components/CreerMissionPage';

describe('CreerMissionPage Component', () => {
    test('renders correctly', () => {
        const { getByText, getByLabelText } = render(<CreerMissionPage />);

        expect(getByText('Créer une nouvelle mission')).toBeInTheDocument();
        fireEvent.click(getByText('Créer une mission'));
        expect(getByLabelText('Nom de la mission:')).toBeInTheDocument();
        expect(getByLabelText('Instructions:')).toBeInTheDocument();
        expect(getByLabelText('Points:')).toBeInTheDocument();
        expect(getByLabelText('Facile')).toBeInTheDocument();
        expect(getByLabelText('Normal')).toBeInTheDocument();
        expect(getByLabelText('Difficile')).toBeInTheDocument();
    });

    test('shows notification after successful mission creation', async () => {
        const { getByText, getByLabelText, getByRole } = render(<CreerMissionPage />);

        // Ouvrir le modal
        fireEvent.click(getByText('Créer une mission'));

        // Remplir le formulaire
        fireEvent.change(getByLabelText('Nom de la mission:'), { target: { value: 'Test Mission' } });
        fireEvent.change(getByLabelText('Instructions:'), { target: { value: 'Test Instructions' } });
        fireEvent.change(getByLabelText('Points:'), { target: { value: '200' } });
        fireEvent.change(getByLabelText('Difficulté:'), { target: { value: '2' } });

        // Soumettre le formulaire
        fireEvent.submit(getByRole('button', { name: /Créer Mission/i }));

        // Vérifier la notification
        await waitFor(() => {
            expect(getByText((content, element) => content.includes('Mission créée avec succès!'))).toBeInTheDocument();
        });
    });

    test('handles errors during mission creation', async () => {
        const { getByText, getByLabelText, getByRole } = render(<CreerMissionPage />);

        fireEvent.click(getByText('Créer une mission'));

        fireEvent.change(getByLabelText('Nom de la mission:'), { target: { value: 'Test Mission' } });
        fireEvent.change(getByLabelText('Instructions:'), { target: { value: 'Test Instructions' } });
        fireEvent.change(getByLabelText('Points:'), { target: { value: 200 } });
        fireEvent.change(getByLabelText('Facile'), { target: { value: '1' } });

        // Simuler une erreur en interférant avec fetch
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Erreur lors de la création de la mission'))
        );

        fireEvent.submit(getByRole('button', { name: /Créer Mission/i }));

        await waitFor(() => {
            expect(getByText('Une erreur est survenue lors de la création de la mission.')).toBeInTheDocument();
        });

        // Réinitialiser fetch
        global.fetch.mockClear();
    });
});

