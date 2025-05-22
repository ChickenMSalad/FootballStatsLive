import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('renders the logo image', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        const logoImg = screen.getByAltText('');
        expect(logoImg).toBeInTheDocument();
        expect(logoImg).toHaveClass('logo');
    });

    it('renders navigation links', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Documentation')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('calls window.open with ESPN link on button click', () => {
        // Mock window.open
        const openSpy = vi.spyOn(window, 'open').mockImplementation(() => { });

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        const button = screen.getByRole('button', { name: /Real Stats/i });
        fireEvent.click(button);

        expect(openSpy).toHaveBeenCalledOnce();
        expect(openSpy).toHaveBeenCalledWith('https://www.espn.com/college-football/teams', '_blank');
    });
});
