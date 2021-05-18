import styled from 'styled-components'

export const ModalFormWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 1200px;
  background-color: rgb(6, 9, 43, 0.3);
`

export const Form = styled.form`
  /* margin: auto; */
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
  padding: 20px;
  border-radius: 4px;
  background-color: rgb(240, 240, 240);
  font-size: 18px;

  input,
  button {
    padding: 15px;
    width: 100%;
    background-color: white;
    font-size: 16px;
  }

  input:read-only {
    background-color: rgb(225, 225, 225);
    font-style: italic;
  }

  button {
    transition: 0.2s;

    &:hover {
      background-color: rgb(200, 200, 200);
      cursor: pointer;
    }
  }
`
