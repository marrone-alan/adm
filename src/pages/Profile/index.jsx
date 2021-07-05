import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// styles
import { Page, Separator, Container } from '../../styles/align';
import { Title } from '../../styles/title';
import { ContainerCenter, NavButton } from './style';

let Profile = (props) => {
  return (
    <Page menuActive={props.isMenuVisible}>
      <Container>
        <Title>Perfil</Title>
        <Separator />
        <ContainerCenter>
          <NavButton>
            <Link to="/perfil/minha-conta">Minha Conta</Link>
          </NavButton>
          <NavButton>
            <Link to="/perfil/dados-pessoais">Dados Pessoais</Link>
          </NavButton>
          <NavButton>
            <Link to="/perfil/relatorio-acesso">Relatório de Acesso</Link>
          </NavButton>
        </ContainerCenter>
      </Container>
    </Page>
  );
};

const mapStateToProps = (store) => ({
  isMenuVisible: store.menu.isMenuVisible,
});

Profile = connect(mapStateToProps)(Profile);

export default Profile;
