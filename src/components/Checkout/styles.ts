import styled from 'styled-components'

export const SidebarContainer = styled.div`
  background-color: #e66767;
  padding: 0 8px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
    border: none;
    height: 32px;
    padding: 8px;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #4b4b4b;
  }
`

export const InlineGroup = styled.div`
  display: flex;
  gap: 34px;
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
  border: none;
  height: 24px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
`

export const ButtonSecondary = styled(ButtonPrimary)`
  background-color: transparent;
  color: #ffeed2;
`

export const TextConfirmacao = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 22px;
  color: #ffeed2;
  margin-bottom: 16px;
`
