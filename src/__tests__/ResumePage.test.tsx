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

    it('when clicking Me link goes to Me Page', async () => {
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

    it('when clicking Blog link goes to Blog Page', async () => {
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
});
