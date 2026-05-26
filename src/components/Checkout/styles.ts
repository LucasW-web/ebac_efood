import styled from 'styled-components'

export const SidebarContainer = styled.div`
  background-color: #e66767;
  padding: 32px 24px;
  max-width: 360px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

export const Title = styled.h3`
  color: #ffeed2;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 16px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  width: 100%;

  label {
    color: #ffeed2;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 8px;
  }

  input {
    background-color: #ffeed2;
    border: 1px solid transparent;
    height: 32px;
    padding: 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #4b4b4b;
    width: 100%;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #ffeed2;
    }
  }
`

export const InlineGroup = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;

  > div {
    flex: 1;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
`

export const ButtonPrimary = styled.button`
  background-color: #ffeed2;
  color: #e66767;
  border: 1px solid #ffeed2;
  height: 32px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f7e2be;
    border-color: #f7e2be;
  }
`

export const ButtonSecondary = styled(ButtonPrimary)`
  background-color: transparent;
  color: #ffeed2;
  border: 1px solid #ffeed2;

  &:hover {
    background-color: rgba(255, 238, 210, 0.1);
    color: #ffeed2;
  }
`

export const TextConfirmacao = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 22px;
  color: #ffeed2;
  margin-bottom: 16px;
`
