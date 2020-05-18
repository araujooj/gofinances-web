import React from 'react';
import { FaFileImport, FaList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { Container } from './styles';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <Link to="/">
          <FaList color="#f5f5f5" size={12} />
          Lista
        </Link>
        <Link to="/import">
          <FaFileImport color="#f5f5f5" size={12} />
          Importar
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
