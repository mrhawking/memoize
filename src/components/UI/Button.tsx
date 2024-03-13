import { Link } from 'react-router-dom';
import classes from './Button.module.css';

type LinkProps = {
  children: React.ReactNode;
  url: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button className={`${classes.button} gradientOrange`} {...props}>{children}</button>;
}
export const ButtonLink: React.FC<LinkProps> = ({ children, url, ...props }) => {
  return <Link to={url} className={`${classes.button} gradientOrange`} {...props}>{children}</Link>;
}


