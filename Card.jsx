import styles from './Card.module.css';

const Card = ({ 
  children, 
  className, 
  onClick,
  elevated = false 
}) => {
  const cardClasses = `${styles.card} ${elevated ? styles.elevated : ''} ${className || ''}`;

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
