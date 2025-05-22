import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
    it('renders the footer text correctly', () => {
        render(<Footer />);

        // Check if the footer text appears
        expect(
            screen.getByText(/Copyright @ 2025, College Football Stats Live - All Rights Reserved./i)
        ).toBeInTheDocument();
    });

    it('has the correct class name', () => {
        render(<Footer />);

        // Check if the rendered div has the class 'footer'
        const footerElement = screen.getByText(/College Football Stats Live/i).parentElement;
        expect(footerElement).toHaveClass('footer');
    });
});
