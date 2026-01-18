import styled from "styled-components";
import { Button, Spinner } from "../button";
import { Container, InputWrapper, Wrapper } from "./Container";
import { useRef, useState } from "react";
import { spinner } from "../../assets";

const Form = styled.form``;

const Input = styled.input`
  background-color: #858585;
  border-radius: 5px;
`;

const Select = styled.select`
  background-color: #858585;
  border-radius: 5px;
`;

const Label = styled.label``;

export const InputForm = () => {
  const [language, setLanguage] = useState<string>("portuguese");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const upload_file = e.target.files[0];
      setSelectedFile(upload_file);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    //define isLoading para true para desabilitar o botao e ativar a animação de carregamento
    setIsLoading(true);
    //verifica se existe um arquivo selecionado
    if (selectedFile === null) {
      return;
    }
    //constrói o formData que será responsável por enviar os dados do formulário
    const formDataToSend = new FormData();
    formDataToSend.append("language", language);
    formDataToSend.append("file", selectedFile);
    try {
      //requisição para o back
      const response = await fetch("https://urahara31.pythonanywhere.com/", {
        body: formDataToSend,
        method: "POST",
      });
      const result = await response.json();
      //escreve no campo definido o resultado
      if (result.is_productive !== null) {
        const elem = document.getElementById("resultText");
        if (elem !== null) {
          if (result.is_productive) {
            elem.innerHTML = "O email é produtivo";
          } else {
            elem.innerHTML = "O email não é produtivo";
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    //define isLoading para false para habilitar o botao e desativar a animação de carregamento
    setIsLoading(false);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Wrapper>
          <Label htmlFor="formData">Informe a linguagem do arquivo</Label>
          {/* select para definir a linguagem que o back vai buscar as stopwords */}
          <Select
            name="formData"
            id="formData"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value={"portuguese"}>Português</option>
            <option value={"english"}>English</option>
          </Select>
        </Wrapper>
        {/* input do arquivo */}
        <InputWrapper>
          <Label htmlFor="file">Arquivo de email (txt ou pdf)</Label>
          <Input
            type="file"
            accept=".txt, .pdf"
            name="file"
            id="file"
            ref={fileInputRef}
            content="multipart/form-data"
            onChange={handleFileChange}
            required
          />
        </InputWrapper>
        {/* botão de submit */}
        {isLoading ? (
          <Button disabled>
            <Spinner src={spinner}></Spinner>
          </Button>
        ) : (
          <Button>Enviar</Button>
        )}
      </Form>
    </Container>
  );
};
