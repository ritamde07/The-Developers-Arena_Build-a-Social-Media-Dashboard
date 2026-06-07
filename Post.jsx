import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import { mockUsers } from '../../utils/api';
import styles from './Post.module.css';

const Post = ({ post = {} }) => {
  // Default post data
  const defaultPost = {
    id: 1,
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
      }
    ]
  };

  const postData = Object.keys(post).length > 0 ? post : defaultPost;

  // Map userId to author if author not provided (for mockPosts format)
  let postWithAuthor = postData;
  if (postData.userId && !postData.author) {
    const author = mockUsers.find(u => u.id === postData.userId);
    if (author) {
      postWithAuthor = {
        ...postData,
        author: {
          name: author.name,
          handle: author.handle,
          avatar: author.avatar
        }
      };
    }
  }

  // State management for post interactions
  const [postState, setPostState] = useState(postWithAuthor);
  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [isLoadingLike, setIsLoadingLike] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);

  // Handle like/unlike with optimistic update
  const handleLike = () => {
    setIsLoadingLike(true);
    
    // Optimistic update
    setPostState(prevPost => ({
      ...prevPost,
      liked: !prevPost.liked,
      likes: prevPost.liked ? prevPost.likes - 1 : prevPost.likes + 1
    }));

    // Simulate API call
    setTimeout(() => {
      setIsLoadingLike(false);
    }, 200);
  };

  // Toggle comment section
  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newCommentText.trim() === '') return;

    setIsLoadingComment(true);

    // Simulate API call
    setTimeout(() => {
      const newComment = {
        id: postState.commentList.length + 1,
        userId: 1,
        userName: 'You',
        userHandle: '@yourhandle',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        text: newCommentText,
        timestamp: 'now'
      };

      setPostState(prevPost => ({
        ...prevPost,
        commentList: [...prevPost.commentList, newComment],
        comments: prevPost.comments + 1
      }));

      setNewCommentText('');
      setIsLoadingComment(false);
    }, 300);
  };

  return (
    <Card className={styles.post}>
      {/* Post Header */}
      <div className={styles.header}>
        <Link to={`/profile/${postState.userId || 1}`} className={styles.authorLink}>
          <div className={styles.author}>
            <img 
              src={postState.author.avatar} 
              alt={postState.author.name}
              className={styles.authorAvatar}
            />
            <div className={styles.authorInfo}>
              <h3 className={styles.authorName}>{postState.author.name}</h3>
              <p className={styles.authorHandle}>{postState.author.handle}</p>
            </div>
          </div>
        </Link>
        <span className={styles.timestamp}>{postState.timestamp}</span>
      </div>

      {/* Post Content */}
      <div className={styles.content}>
        <p className={styles.text}>{postState.content}</p>
        {postState.image && (
          <img 
            src={postState.image} 
            alt="Post content"
            className={styles.postImage}
          />
        )}
      </div>

      {/* Post Stats */}
      <div className={styles.stats}>
        <span className={styles.statItem}>{postState.likes} Likes</span>
        <span 
          className={styles.statItem}
          onClick={handleToggleComments}
        >
          {postState.comments} Comments
        </span>
        <span className={styles.statItem}>{postState.shares} Shares</span>
      </div>

      {/* Post Actions */}
      <div className={styles.actions}>
        <button 
          className={`${styles.actionBtn} ${postState.liked ? styles.liked : ''}`}
          onClick={handleLike}
          disabled={isLoadingLike}
        >
          <span className={styles.icon}>❤️</span>
          <span>{postState.liked ? 'Liked' : 'Like'}</span>
        </button>
        <button 
          className={styles.actionBtn}
          onClick={handleToggleComments}
        >
          <span className={styles.icon}>💬</span>
          <span>Comment</span>
        </button>
        <button className={styles.actionBtn}>
          <span className={styles.icon}>📤</span>
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className={styles.commentsSection}>
          {/* Existing Comments */}
          <div className={styles.commentsList}>
            {postState.commentList && postState.commentList.length > 0 ? (
              postState.commentList.map(comment => (
                <div key={comment.id} className={styles.comment}>
                  <img 
                    src={comment.userAvatar} 
                    alt={comment.userName}
                    className={styles.commentAvatar}
                  />
                  <div className={styles.commentContent}>
                    <div className={styles.commentHeader}>
                      <strong>{comment.userName}</strong>
                      <span className={styles.commentHandle}>{comment.userHandle}</span>
                      <span className={styles.commentTime}>{comment.timestamp}</span>
                    </div>
                    <p className={styles.commentText}>{comment.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noComments}>No comments yet. Be the first!</p>
            )}
          </div>

          {/* Add Comment Input */}
          <div className={styles.addCommentSection}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddComment();
                }
              }}
              className={styles.commentInput}
              disabled={isLoadingComment}
            />
            <Button 
              size="small"
              variant="primary"
              onClick={handleAddComment}
              disabled={newCommentText.trim() === '' || isLoadingComment}
            >
              {isLoadingComment ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Post;
