import Card from '../common/Card';
import Button from '../common/Button';
import styles from './Profile.module.css';

const Profile = ({ user = {} }) => {
  const {
    name = 'John Doe',
    bio = 'Passionate developer and tech enthusiast',
    followers = 1250,
    following = 340,
    avatar = 'https://via.placeholder.com/120?text=User'
  } = user;

  return (
    <Card className={styles.profileCard} elevated>
      <div className={styles.profileHeader}>
        <img src={avatar} alt={name} className={styles.avatar} />
        <div className={styles.userInfo}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.bio}>{bio}</p>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{followers}</span>
          <span className={styles.statLabel}>Followers</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>{following}</span>
          <span className={styles.statLabel}>Following</span>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="primary" className={styles.btn}>Follow</Button>
        <Button variant="secondary" className={styles.btn}>Message</Button>
      </div>
    </Card>
  );
};

export default Profile;
