import styled from 'styled-components'
import HeroImg from '../../assets/images/Vector.png'
import { breackpoints } from '../../styles'
import { cores } from '../../styles'

export const Imagem = styled.div`
  background-image: url(${HeroImg});
  width: 100%;
  display: block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`
export const HeroContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  padding: 40px 16px;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    align-items: center;
    font-weight: 900;
    font-size: 36px;
    max-width: 540px;
    width: 100%;
    margin: 0 auto;
    line-height: 120%;
    color: ${cores.salmao};
  }

  img {
    align-items: center;
    margin-bottom: 139px;
    cursor: pointer;

    @media (max-width: ${breackpoints.tablet}) {
      margin-bottom: 40px;
    }
  }

  @media (max-width: ${breackpoints.tablet}) {
    font-size: 24px;
    line-height: 32px;
    max-width: 100%;
  }
`
