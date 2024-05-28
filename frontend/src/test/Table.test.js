import React, { useState, useEffect } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Table from '../components/Table'

describe('Table Component', () => {
    test('renders correctly', () => {
        const { getByText, getByLabelText } = render(<Table />);

        expect(getByText('Tableau de Classement')).toBeInTheDocument();
        expect(getByText('Nom ↑')).toBeInTheDocument();
        expect(getByText('Points ↑')).toBeInTheDocument();
        expect(getByText('Points 24H ↑')).toBeInTheDocument();
        expect(getByText('Missions Finies ↑')).toBeInTheDocument();
        expect(getByText('Dernière Mission ↑')).toBeInTheDocument();
    });
    
    test('numbers are numbers', () => {
        const { geAlltByRole } = render(<Table />);
        const entries = getAllByRole('td');
        
        expect(!isNaN(iNumber(entries[6])));
        expect(!isNaN(iNumber(entries[7])));
        expect(!isNaN(iNumber(entries[8])));
    });

    test('sort players by name', async () => {
        const { getByText, geAlltByRole } = render(<Table />);

        // Trier par nom
        fireEvent.click(getByText('Nom ↑'));

        // Vérifier l'ordre
        await waitFor(() => {
            const entries = getAllByRole('td');
            expect(entries[5] <= entries [10]);
            expect(entries[10] <= entries [15]);
        });
    });
    
    test('sort players by points', async () => {
        const { getByText, geAlltByRole } = render(<Table />);

        // Trier par nom
        fireEvent.click(getByText('Points ↑'));

        // Vérifier l'ordre
        await waitFor(() => {
            const entries = getAllByRole('td');
            expect(entries[6] >= entries [11]);
            expect(entries[11] >= entries [16]);
        });
    });
    
    test('sort players by points 24H', async () => {
        const { getByText, geAlltByRole } = render(<Table />);

        // Trier par nom
        fireEvent.click(getByText('Points 24H ↑'));

        // Vérifier l'ordre
        await waitFor(() => {
            const entries = getAllByRole('td');
            expect(entries[7] >= entries [12]);
            expect(entries[12] >= entries [17]);
        });
    });
    
    test('sort players by Missions Finies', async () => {
        const { getByText, geAlltByRole } = render(<Table />);

        // Trier par nom
        fireEvent.click(getByText('Missions Finies ↑'));

        // Vérifier l'ordre
        await waitFor(() => {
            const entries = getAllByRole('td');
            expect(entries[8] >= entries [13]);
            expect(entries[13] >= entries [18]);
        });
    });
    
    test('sort players by Dernière Mission', async () => {
        const { getByText, geAlltByRole } = render(<Table />);

        // Trier par nom
        fireEvent.click(getByText('Dernière Mission ↑'));

        // Vérifier l'ordre
        await waitFor(() => {
            const entries = getAllByRole('td');
            expect(entries[9] <= entries [14]);
            expect(entries[14] <= entries [19]);
        });
    });
});
