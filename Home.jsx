import { useState, useEffect } from 'react';
import Post from '../../components/Post/Post';
import styles from './Home.module.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching posts from an API
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock data - in Phase 2, this will come from api.js
        const mockPosts = [
          {
            id: 1,
            userId: 1,
            author: {
              name: 'Jane Smith',
              handle: '@janesmith',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
            },
            timestamp: '2 hours ago',
            content: 'Just launched my new React project! Really excited about how clean the component architecture turned out. Check it out and let me know your thoughts!',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
            likes: 234,
            comments: 45,
            shares: 12,
            liked: false,
            commentList: [
              {
                id: 1,
                userId: 2,
                userName: 'John Doe',
                userHandle: '@johndoe',
                userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
                text: 'This looks amazing! The component structure is really clean.',
                timestamp: '1 hour ago'
              },
              {
                id: 2,
                userId: 3,
                userName: 'Sarah Johnson',
                userHandle: '@sarahjohnson',
                userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
                text: 'Love the attention to detail! Great work! 🎉',
                timestamp: '30 minutes ago'
              }
            ]
          },
          {
            id: 2,
            userId: 2,
            author: {
              name: 'John Doe',
              handle: '@johndoe',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
            },
            timestamp: '4 hours ago',
            content: 'Pro tip: Always use semantic HTML. It improves accessibility and SEO. Your future self will thank you! 🚀',
            image: null,
            likes: 567,
            comments: 89,
            shares: 145,
            liked: false,
            commentList: [
              {
                id: 3,
                userId: 1,
                userName: 'Jane Smith',
                userHandle: '@janesmith',
                userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
                text: 'Absolutely! Accessibility first should be everyone\'s motto.',
                timestamp: '2 hours ago'
              }
            ]
          },
          {
            id: 3,
            userId: 3,
            author: {
              name: 'Sarah Johnson',
              handle: '@sarahjohnson',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
            },
            timestamp: '6 hours ago',
            content: 'Sharing my latest design system updates. The new component library is 40% faster than the previous version!',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
            likes: 432,
            comments: 67,
            shares: 98,
            liked: false,
            commentList: []
          },
          {
            id: 4,
            userId: 4,
            author: {
              name: 'Mike Chen',
              handle: '@mikechen',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
            },
            timestamp: '8 hours ago',
            content: 'Containerization changed the way I deploy applications. If you\'re not using Docker yet, now is the time to learn!',
            image: 'https://images.unsplash.com/photo-1516534775068-bb6d1fa6d856?w=600&h=400&fit=crop',
            likes: 345,
            comments: 54,
            shares: 76,
            liked: false,
            commentList: [
              {
                id: 4,
                userId: 2,
                userName: 'John Doe',
                userHandle: '@johndoe',
                userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
                text: 'Docker is a game-changer! Great post.',
                timestamp: '5 hours ago'
              }
            ]
          },
          {
            id: 5,
            userId: 5,
            author: {
              name: 'Emma Wilson',
              handle: '@emmawilson',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
            },
            timestamp: '10 hours ago',
            content: 'Just finished reading "Inspired" by Marty Cagan. Highly recommend it for anyone working in product. Fantastic insights! 📚',
            image: null,
            likes: 289,
            comments: 42,
            shares: 61,
            liked: false,
            commentList: []
          },
          {
            id: 6,
            userId: 1,
            author: {
              name: 'Jane Smith',
              handle: '@janesmith',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane'
            },
            timestamp: '12 hours ago',
            content: 'Working on a new feature that implements optimistic updates for better UX. The snappiness is incredible!',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
            likes: 198,
            comments: 31,
            shares: 45,
            liked: false,
            commentList: []
          }
        ];

        setPosts(mockPosts);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        console.error('Error loading posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>⚠️ {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.home}>
      <div className={styles.feedHeader}>
        <h1>Your Feed</h1>
        <p className={styles.feedSubtitle}>Latest posts from people you follow</p>
      </div>
      
      <div className={styles.feed}>
        {posts.length > 0 ? (
          posts.map(post => (
            <Post key={post.id} post={post} />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No posts yet. Follow some people to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
