import styled from 'styled-components'

export const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  margin: 0;
  background: rgb(2,0,36);
  background: linear-gradient(194deg, rgba(2,0,36,1) 0%, rgba(28,28,133,1) 35%, rgba(24,79,150,1) 44%, rgba(171,0,255,1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Image = styled.img`
  width: 100px;
  height: 100px;
`

export const MainTitle = styled.h2`
  margin: 0;
  padding: 10px;
  max-width: 100px;
  font-weight: bold;
  color: white;
`

export const WelcomeMessage = styled.p`
  margin: 0;
  padding: 10px;
  max-width: 300px;
  text-align: center;
  color: white;
  font-size: 12px;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  padding: 10px;
  padding-left: 0;
  margin-top: 10px;
  color: white;
  font-weight: 600;
`

export const Input = styled.input`
  padding: 10px 15px;
  border-radius: 5px;
  border: 0;
  box-shadow: 0 0 10px #fff;
  color: #333;
`

export const SubmitButton = styled.button`
  padding: 10px 15px;
  border-radius: 5px;
  border: 0;
  box-shadow: 0 0 10px #fff;
  margin-top: 30px;
  color: #333;
  font-weight: bold;
  background: white;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background: #fee;
    box-shadow: 0 0 2px #c0c0c0;
  }
`

export const RegisterAnchor = styled.a`
  margin-top: 10px;
  color: white;
  text-decoration: underline;
`
