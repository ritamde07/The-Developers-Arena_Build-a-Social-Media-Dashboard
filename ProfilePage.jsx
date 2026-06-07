import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Post from '../../components/Post/Post';
import { mockUsers, mockPosts } from '../../utils/api';

export default function ProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find user by ID
        const foundUser = mockUsers.find(u => u.id === parseInt(userId));
        if (!foundUser) {
          setError('User not found');
          return;
        }
        
        setUser(foundUser);
        
        // Get user's posts
        const userPostList = mockPosts.filter(post => post.userId === foundUser.id);
        setUserPosts(userPostList);
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [userId]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p>{error}</p>
          <Button onClick={() => navigate('/')} variant="primary">
            Back to Feed
          </Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p>User not found</p>
          <Button onClick={() => navigate('/')} variant="primary">
            Back to Feed
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Profile Card */}
      <Card hoverable={false}>
        <div className={styles.profileCard}>
          {/* Banner */}
          <div 
            className={styles.banner}
            style={{ backgroundImage: `url(${user.banner})` }}
          />
          
          {/* Profile Info */}
          <div className={styles.profileContent}>
            {/* Avatar */}
            <img 
              src={user.avatar} 
              alt={user.name}
              className={styles.avatar}
            />
            
            {/* User Info */}
            <div className={styles.userInfo}>
              <h1 className={styles.name}>{user.name}</h1>
              <p className={styles.handle}>{user.handle}</p>
              <p className={styles.bio}>{user.bio}</p>
            </div>
            
            {/* Stats */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{user.posts}</span>
                <span className={styles.statLabel}>Posts</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{user.followers}</span>
                <span className={styles.statLabel}>Followers</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{user.following}</span>
                <span className={styles.statLabel}>Following</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className={styles.actions}>
              <Button 
                variant={isFollowing ? 'secondary' : 'primary'}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button variant="secondary">Message</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* User's Posts */}
      <div className={styles.postsSection}>
        <h2 className={styles.postsTitle}>{user.name}'s Posts</h2>
        
        {userPosts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No posts yet</p>
          </div>
        ) : (
          <div className={styles.postsList}>
            {userPosts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className={styles.backButton}>
        <Button 
          variant="secondary" 
          onClick={() => navigate('/')}
        >
          ← Back to Feed
        </Button>
      </div>
    </div>
  );
}
