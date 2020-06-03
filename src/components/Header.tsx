import Link from 'next/link';
import styles from './Header.module.css';

interface HeaderProps {
  translations?: { id: string; href: string; name: string }[];
}

export const Header = ({ translations = [] }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.inline}>
          <Link href="/">
            <a>Wizardo</a>
          </Link>

          {translations.length > 1 ? (
            <ul className={styles.translations}>
              {translations.map((language) => (
                <li key={language.id}>
                  <Link href={language.href}>
                    <a>{language.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </header>
  );
};
