interface HeaderProps {
  title: string;
  className?: string;
}

export const Header = ({ title, className }: HeaderProps) => {
  return (
    <header id="header">
      <h1 className={className}>{title}</h1>
    </header>
  );
};
