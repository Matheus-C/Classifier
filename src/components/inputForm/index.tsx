import styled from "styled-components";
import { Button } from "../button";

const Form = styled.form`
`

const Input = styled.input`
`

export const InputForm = () => {
  return (
    <Form>
      <Input type="file" accept=".txt, .pdf" name="email_file" />
      <Button>Enviar</Button>
    </Form>
  )
}