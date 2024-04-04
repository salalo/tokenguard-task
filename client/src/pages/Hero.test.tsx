import Hero from './Hero';
import { render, screen, waitFor } from "../utils/test-utils";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


describe('Hero Component', () => {
  // mocking echarts library
  vi.mock('echarts-for-react', () => ({
    __esModule: true,
    default: () => { return <div data-testid="mock-echart"></div>; },
  }));

  it('renders default components after fetching', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 0,
          retry: false,
        },
      },
    })

    render(
      <QueryClientProvider client={queryClient}>
        <Hero />
      </QueryClientProvider>,
    );

    expect(screen.queryByTestId('chart-loader')).toBeInTheDocument();

    // Wait for the loading state to disappear
    await waitFor(() => {
      expect(screen.queryByTestId('chart-loader')).not.toBeInTheDocument();

    });

    // Successful fetch component rendering
    expect(screen.queryByText('Select blockchain')).toBeInTheDocument();
    expect(screen.queryByText('ethereum')).toBeInTheDocument();
    expect(screen.queryByText('Compare with')).toBeInTheDocument();
    expect(screen.queryByText('solana')).toBeInTheDocument();
    expect(screen.queryByText('Select granularity')).toBeInTheDocument();
    expect(screen.queryByText('1 week')).toBeInTheDocument();
  });
});