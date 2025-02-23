import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MeHeader from '../features/me/MeHeader';
import { BrowserRouter } from 'react-router-dom';
import MeCTA from '../features/me/MeCTA';

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

describe('Test Me CTA', () => {
  it('renders all links correctly', () => {
    render(
      <BrowserRouter>
        <MeCTA />
      </BrowserRouter>
    );

    // check navigation links
    expect(screen.getByText('See my Resume')).toBeInTheDocument();
    expect(screen.getByText('Go to my Blog')).toBeInTheDocument();

    // check social media links
    // Check social media links using aria-labels
    expect(screen.getByLabelText('GitHub Profile')).toHaveAttribute(
      'href',
      'https://github.com/fkurusu7'
    );
    // expect(screen.getByLabelText('LinkedIn Profile')).toHaveAttribute('href', '#');
    expect(screen.getByLabelText('X Profile')).toHaveAttribute('href', 'https://x.com/FerCuVa');
  });
});
