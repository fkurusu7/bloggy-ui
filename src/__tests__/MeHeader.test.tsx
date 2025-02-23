import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MeHeader from '../features/me/MeHeader';

describe('Test MeHeader', () => {
  it('renders header with correct content', () => {
    render(<MeHeader />);

    // check if main elements are present
    expect(screen.getByText("Hello, I'm Fer")).toBeInTheDocument();
    expect(screen.getByText('Solopreneur')).toBeInTheDocument();
    expect(screen.getByAltText('Me, Fer CuVa')).toBeInTheDocument();

    // check if intro text is present
    expect(
      screen.getByText(/Full-stack developer merging technical expertise/i)
    ).toBeInTheDocument();
  });
});
