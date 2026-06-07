// Mock Data for Social Media Dashboard
// This simulates a backend API

export const mockUsers = [
  {
    id: 1,
    name: 'Jane Smith',
    handle: '@janesmith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    bio: 'Full-stack developer | Tech blogger | Coffee addict',
    followers: 567,
    following: 234,
    posts: 45,
    banner: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=1200&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'John Doe',
    handle: '@johndoe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    bio: 'Web Developer | React Enthusiast | Coffee Lover',
    followers: 1234,
    following: 567,
    posts: 89,
    banner: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=1200&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    handle: '@sarahjohnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'UI/UX Designer | Design System enthusiast',
    followers: 892,
    following: 445,
    posts: 67,
    banner: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=1200&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Mike Chen',
    handle: '@mikechen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    bio: 'DevOps Engineer | Cloud Architecture | Open Source',
    followers: 654,
    following: 321,
    posts: 52,
    banner: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=1200&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    handle: '@emmawilson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    bio: 'Product Manager | StartUp enthusiast | Mentor',
    followers: 734,
    following: 412,
    posts: 71,
    banner: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=1200&h=300&fit=crop'
  }
];

export const mockPosts = [
  {
    id: 1,
    userId: 1,
    content: 'Just launched my new React project! Really excited about how clean the component architecture turned out. Check it out and let me know your thoughts!',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    timestamp: '2 hours ago',
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
    content: 'Pro tip: Always use semantic HTML. It improves accessibility and SEO. Your future self will thank you! 🚀',
    image: null,
    timestamp: '4 hours ago',
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
    content: 'Sharing my latest design system updates. The new component library is 40% faster than the previous version!',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    timestamp: '6 hours ago',
    likes: 432,
    comments: 67,
    shares: 98,
    liked: false,
    commentList: []
  },
  {
    id: 4,
    userId: 4,
    content: 'Containerization changed the way I deploy applications. If you\'re not using Docker yet, now is the time to learn!',
    image: 'https://images.unsplash.com/photo-1516534775068-bb6d1fa6d856?w=600&h=400&fit=crop',
    timestamp: '8 hours ago',
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
    content: 'Just finished reading "Inspired" by Marty Cagan. Highly recommend it for anyone working in product. Fantastic insights! 📚',
    image: null,
    timestamp: '10 hours ago',
    likes: 289,
    comments: 42,
    shares: 61,
    liked: false,
    commentList: []
  },
  {
    id: 6,
    userId: 1,
    content: 'Working on a new feature that implements optimistic updates for better UX. The snappiness is incredible!',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    timestamp: '12 hours ago',
    likes: 198,
    comments: 31,
    shares: 45,
    liked: false,
    commentList: []
  }
];

// Simulate API Helper Functions with delays
export const fetchPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Enhance posts with user data
      const postsWithUsers = mockPosts.map(post => {
        const author = mockUsers.find(user => user.id === post.userId);
        return {
          ...post,
          author: {
            name: author.name,
            handle: author.handle,
            avatar: author.avatar
          }
        };
      });
      resolve(postsWithUsers);
    }, 800);
  });
};

export const fetchUserProfile = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === userId);
      resolve(user || null);
    }, 500);
  });
};

export const fetchUserPosts = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userPosts = mockPosts.filter(post => post.userId === userId);
      const postsWithUsers = userPosts.map(post => {
        const author = mockUsers.find(user => user.id === post.userId);
        return {
          ...post,
          author: {
            name: author.name,
            handle: author.handle,
            avatar: author.avatar
          }
        };
      });
      resolve(postsWithUsers);
    }, 600);
  });
};

export const likePost = (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = mockPosts.find(p => p.id === postId);
      if (post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        resolve({ success: true, post });
      } else {
        resolve({ success: false });
      }
    }, 200);
  });
};

export const addComment = (postId, comment) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = mockPosts.find(p => p.id === postId);
      if (post) {
        const newComment = {
          id: post.commentList.length + 1,
          ...comment,
          timestamp: 'now'
        };
        post.commentList.push(newComment);
        post.comments += 1;
        resolve({ success: true, comment: newComment });
      } else {
        resolve({ success: false });
      }
    }, 300);
  });
};
