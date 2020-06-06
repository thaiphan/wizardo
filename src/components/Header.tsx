import Link from 'next/link';
import styled from 'styled-components';
import { Container } from './Container';

const StyledHeader = styled.header`
  background-color: black;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Inline = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Translations = styled.ul`
  display: flex;
  list-style: none;

  > li + li {
    margin-left: 10px;
  }
`;

interface HeaderProps {
  translations?: { id: string; href: string; name: string }[];
}

export const Header = ({ translations = [] }: HeaderProps) => {
  return (
    <StyledHeader>
      <Container>
        <Inline>
          <Link href="/">
            <a>Wizardo</a>
          </Link>

          {translations.length > 1 ? (
            <Translations>
              {translations.map((language) => (
                <li key={language.id}>
                  <Link href={language.href}>
                    <a>{language.name}</a>
                  </Link>
                </li>
              ))}
            </Translations>
          ) : null}
        </Inline>
      </Container>
    </StyledHeader>
  );
};
