import styled from 'styled-components'
import { cores } from '../../styles'

export const FooterContainer = styled.footer`
  background-color: ${cores.salmaoClaro};
  padding: 40px 0;
  width: 100%;
`

export const Logo = styled.img`
  width: 125px;
  margin-bottom: 32px;
`

export const SocialLinks = styled.ul`
  display: flex;
  justify-content: center;
  gap: 8px;
  list-style: none;
  margin-bottom: 80px;
  padding: 0;

  li {
    cursor: pointer;
  }
`

export const Copyright = styled.p`
  font-size: 10px;
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
  color: ${cores.salmao};
`
export const Centralizador = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`
