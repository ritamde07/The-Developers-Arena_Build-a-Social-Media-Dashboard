import styles from './Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  className,
  ...props 
}) => {
  const baseClasses = `${styles.button} ${styles[variant]}`;
  const finalClasses = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <button 
      className={finalClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
