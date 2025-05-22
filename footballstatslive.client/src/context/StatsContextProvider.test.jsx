import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import StatsContextProvider, { StatsContext } from './StatsContext';

// Mocked response for /footballstats/index
const mockStats = [
    {
        rank: 1,
        team: 'Testers',
        mascot: 'Debug',
        dateOfLastWin: '2025-04-01',
        winningPercentage: 0.9,
        wins: 9,
        losses: 1,
        ties: 0,
        games: 10,
    }
];

// Helper test component to consume context and display data
const TestConsumer = () => (
    <StatsContext.Consumer>
        {({ stats }) => (
            <div>
                {stats ? (
                    <div data-testid="team-name">{stats[0].team}</div>
                ) : (
                    <div data-testid="loading">Loading...</div>
                )}
            </div>
        )}
    </StatsContext.Consumer>
);

describe('StatsContextProvider', () => {
    beforeEach(() => {
        // Reset mocks before each test
        vi.resetAllMocks();

        // Global fetch mock for both endpoints
        global.fetch = vi.fn((url) => {
            if (url === '/footballstats') {
                return Promise.resolve({ ok: true });
            }
            if (url === '/footballstats/index') {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockStats),
                });
            }
            return Promise.reject(new Error('Unknown URL'));
        });

        // Simulate production environment (no polling)
        process.env.NODE_ENV = 'production';
    });

    it('shows loading initially', () => {
        render(
            <StatsContextProvider>
                <TestConsumer />
            </StatsContextProvider>
        );
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    it('loads and displays football stats after fetch', async () => {
        render(
            <StatsContextProvider>
                <TestConsumer />
            </StatsContextProvider>
        );

        // Wait for fetch and rendering
        await waitFor(() => {
            expect(screen.getByTestId('team-name')).toHaveTextContent('Testers');
        });
    });

    it('handles server unavailable during fetch', async () => {
        // Simulate server failure
        global.fetch = vi.fn(() => Promise.resolve({ ok: false }));

        render(
            <StatsContextProvider>
                <TestConsumer />
            </StatsContextProvider>
        );

        // Wait and confirm that it stays in loading state (since fetch fails)
        await waitFor(() => {
            expect(screen.getByTestId('loading')).toBeInTheDocument();
        });
    });
});
