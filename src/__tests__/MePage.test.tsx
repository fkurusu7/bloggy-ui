import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import MeHeader from '../features/me/MeHeader';
import { BrowserRouter } from 'react-router-dom';
import MeCTA from '../features/me/MeCTA';
import MeBackground from '../features/me/MeBackground';

describe('Test MeHeader', () => {
  it('renders header with correct content', () => {
    render(<MeHeader />);

    // check if main elements are present
    expect(screen.getByText("Hello, I'm Fer")).toBeInTheDocument();
    expect(screen.getByText('Solopreneur')).toBeInTheDocument();
    expect(screen.getByAltText('Me, Fer CuVa')).toBeInTheDocument();

    // check if intro text is present
    expect(
      screen.getByText(/full-stack developer passionate about transforming /i)
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

describe('Test Tabs in background', () => {
  it('renders with initial skilss tab active', () => {
    render(<MeBackground />);

    // check if title is present
    expect(screen.getByText('Background')).toBeInTheDocument();

    // check if all tab buttons are present
    expect(screen.getByRole('button', { name: /skills/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hobbies/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /stack/i })).toBeInTheDocument();

    // check if initial skills are displayed
    expect(screen.getByText('html')).toBeInTheDocument();
    expect(screen.getByText('javascript')).toBeInTheDocument();
  });

  it('changes content when different tab is clicked', () => {
    render(<MeBackground />);

    // click hobbies tab
    fireEvent.click(screen.getByRole('button', { name: /hobbies/i }));

    // check if hobbies content is displayed
    expect(screen.getByText('coding')).toBeInTheDocument();
    expect(screen.getByText('chess')).toBeInTheDocument();
  });
});
