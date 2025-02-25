/* import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MemoryRouter } from 'react-router-dom';

import Posts from '../features/blog/Posts';

import BlogHeader from '../features/blog/BlogHeader';

// Mock the Redux store with a more complete implementation
const createMockStore = (initialState: any) => {
  return {
    getState: () => initialState,
    subscribe: vi.fn(),
    dispatch: vi.fn(),
  };
};

// Mock posts for testing
const mockPosts = [
  {
    id: '1',
    title: 'First Test Post',
    content: 'This is the content for the first test post',
    slug: 'first-test-post',
    tags: ['react', 'testing'],
    publishedDate: '2023-01-01T12:00:00Z',
    author: { id: '1', username: 'testuser' },
  },
  {
    id: '2',
    title: 'Second Test Post About Vitest',
    content: 'This is about vitest and testing',
    slug: 'second-test-post',
    tags: ['vitest', 'testing'],
    publishedDate: '2023-01-02T12:00:00Z',
    author: { id: '2', username: 'anotheruser' },
  },
  {
    id: '3',
    title: 'React Hooks Explained',
    content: 'All about React hooks',
    slug: 'react-hooks-explained',
    tags: ['react', 'hooks'],
    publishedDate: '2023-01-03T12:00:00Z',
    author: { id: '1', username: 'testuser' },
  },
];

// Mock custom hooks
vi.mock('./hooks/useAuth', () => ({
  useAuth: () => ({
    handleSignout: vi.fn(),
  }),
}));

vi.mock('./hooks/useModal', () => ({
  useModal: () => ({
    isOpenModal: false,
    closeModal: vi.fn(),
    toggleModal: vi.fn(),
  }),
}));

vi.mock('./hooks/useAppSelector', () => ({
  useAppSelector: (selector: any) =>
    selector({
      user: { currentUser: null },
      posts: { posts: mockPosts, isLoading: false, error: null },
    }),
}));

// Mock API calls
vi.mock('./services/api', () => ({
  fetchPosts: vi.fn(() => Promise.resolve(mockPosts)),
  fetchPostsBySearch: vi.fn((searchTerm) =>
    Promise.resolve(
      mockPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  ),
  fetchPostsByTag: vi.fn((tag) =>
    Promise.resolve(mockPosts.filter((post) => post.tags.includes(tag)))
  ),
  fetchPostBySlug: vi.fn((slug) => Promise.resolve(mockPosts.find((post) => post.slug === slug))),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock LightOnDarkProvider and LightOnDarkToggle
vi.mock('./components/LightOnDarkProvider', () => ({
  default: ({ children }: any) => <div data-testid="light-dark-provider">{children}</div>,
}));

vi.mock('./components/LightOnDarkToggle', () => ({
  default: () => <button data-testid="light-dark-toggle">Toggle</button>,
}));

describe('Blog Functionality Tests', () => {
  describe('Posts Page', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('renders all posts on the blog page', async () => {
      // Use MemoryRouter instead of createMemoryRouter
      render(
        <MemoryRouter initialEntries={['/blog']}>
          <Posts />
        </MemoryRouter>
      );

      // Wait for posts to load
      await waitFor(() => {
        expect(screen.getByText('First Test Post')).toBeInTheDocument();
        expect(screen.getByText('Second Test Post About Vitest')).toBeInTheDocument();
        expect(screen.getByText('React Hooks Explained')).toBeInTheDocument();
      });
    });

    it('allows searching for posts via the header search input', async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <BlogHeader />
        </MemoryRouter>
      );

      const searchInput = screen.getByPlaceholderText('Search for a post');
      await user.type(searchInput, 'vitest');
      fireEvent.keyDown(searchInput, { key: 'Enter' });

      // Verify navigation was called with the correct search term
      expect(mockNavigate).toHaveBeenCalledWith('/blog/search/vitest');
    });

    it('displays filtered posts when searching', async () => {
      // Mock the router params
      vi.mock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom');
        return {
          ...actual,
          useParams: () => ({ searchTerm: 'vitest' }),
          useNavigate: () => mockNavigate,
        };
      });

      render(
        <MemoryRouter initialEntries={['/blog/search/vitest']}>
          <Posts />
        </MemoryRouter>
      );

      // Only the post matching "vitest" should be shown
      await waitFor(() => {
        expect(screen.getByText('Second Test Post About Vitest')).toBeInTheDocument();
        expect(screen.queryByText('First Test Post')).not.toBeInTheDocument();
      });
    });
  });

  describe('Blog Header', () => {
    it('renders the header with logo and search', () => {
      render(
        <MemoryRouter>
          <BlogHeader />
        </MemoryRouter>
      );

      expect(screen.getByText('¯\\_(ツ)_/¯')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search for a post')).toBeInTheDocument();
    });

    it('shows sign in button when user is not logged in', () => {
      render(
        <MemoryRouter>
          <BlogHeader />
        </MemoryRouter>
      );

      const signInButton = screen.getByTestId('sign-in-button');
      expect(signInButton).toBeInTheDocument();
    });
  });

  describe('Integration Test with Isolated Components', () => {
    it('handles blog post navigation', async () => {
      // Setting up Posts component with mocked API dependencies
      render(
        <MemoryRouter initialEntries={['/blog']}>
          <Posts />
        </MemoryRouter>
      );

      // Wait for posts to be displayed
      await waitFor(() => {
        expect(screen.getByText('First Test Post')).toBeInTheDocument();
      });

      // Mock clicking on a post title
      fireEvent.click(screen.getByText('First Test Post'));

      // Check if navigation occurred with correct slug
      expect(mockNavigate).toHaveBeenCalledWith('/blog/posts/first-test-post');
    });
  });
});
 */
