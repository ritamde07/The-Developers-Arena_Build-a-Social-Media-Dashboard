import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import Button from '../common/Button';
import { useLocalStorage } from '../../hooks';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('theme-dark-mode', false);
  const navigate = useNavigate();

  // Apply theme on component mount and when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    // Navigate to first user's profile for demo
    navigate('/profile/1');
  };

  const handleNotificationsClick = (e) => {
    e.preventDefault();
    alert('Notifications feature coming soon!');
  };

  const handleSignIn = () => {
    alert('Sign In feature coming soon!');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.brandLink}>
          <div className={styles.brand}>
            <h1 className={styles.logo}>SocialHub</h1>
            <span className={styles.tagline}>Stay Connected</span>
          </div>
        </Link>
        
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <a href="#" className={styles.navLink} onClick={handleProfileClick}>Profile</a>
          <a href="#" className={styles.navLink} onClick={handleNotificationsClick}>Notifications</a>
        </nav>
        
        <div className={styles.actions}>
          <button 
            className={styles.themeToggle}
            onClick={toggleTheme}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <Button 
            variant="outline" 
            className={styles.signInBtn}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
