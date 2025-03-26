import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Resume from '../features/resume/Resume';
import { BrowserRouter } from 'react-router-dom';

describe('Test Resume', () => {
  describe('Test Resume Header', () => {
    it('renders header buttons', async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <Resume />
          </BrowserRouter>
        );
      });
      // check if both buttons are present
      const meLink = screen.getByLabelText('Me Page');
      const blogLink = screen.getByLabelText('Blog Page');

      expect(meLink).toBeInTheDocument();
      expect(blogLink).toBeInTheDocument();

      expect(meLink).toHaveAttribute('href', '/me');
      expect(blogLink).toHaveAttribute('href', '/blog');
    });

    it('goes to Me Page when clicking Me link', async () => {
      const user = userEvent.setup();

      await act(async () => {
        render(
          <BrowserRouter>
            <Resume />
          </BrowserRouter>
        );
      });

      const meLink = screen.getByLabelText('Me Page');
      await user.click(meLink);

      // check if the naviagation occurred
      expect(window.location.pathname).toBe('/me');
    });

    it('goes to Blog Page when clicking Blog link', async () => {
      const user = userEvent.setup();

      await act(async () => {
        render(
          <BrowserRouter>
            <Resume />
          </BrowserRouter>
        );
      });

      const blogLink = screen.getByLabelText('Blog Page');
      await user.click(blogLink);

      // check if the naviagation occurred
      expect(window.location.pathname).toBe('/blog');
    });
  });

  describe('Test Resume Introduction', () => {
    it('renders Resume Introduction and profile image', async () => {
      await act(async () => {
        render(
          <BrowserRouter>
            <Resume />
          </BrowserRouter>
        );
      });

      // Test headings
      expect(screen.getByText('Fernando C.')).toBeInTheDocument();
      expect(screen.getByText(/full-stack developer transforming complex /i)).toBeInTheDocument();

      // image test
      const profileImage = screen.getByAltText('profile pic of Fernando');
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute('src', '/me_temp.png');
      expect(profileImage).toHaveClass('resume__introduction-image');
    });
  });
});
