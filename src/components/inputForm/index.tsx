import styled from "styled-components";
import { Button } from "../button";
import { Container, Wrapper } from "./Container";
import { useRef, useState } from "react";

const Form = styled.form``;

const Input = styled.input``;

const Select = styled.select``;

const Label = styled.label``;

export const InputForm = () => {
  const [language, setLanguage] = useState<string>("portuguese");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const upload_file = e.target.files[0];
      setSelectedFile(upload_file);
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile === null) {
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("language", language);
    formDataToSend.append("file", selectedFile);
    try {
      const response = await fetch("https://urahara31.pythonanywhere.com/", {
        body: formDataToSend,
        method: "POST",
      });
      const result = await response.json();
      if (result.is_productive !== null) {
        if (document.getElementById("resultText") !== null) {
          if (result.is_productive) {
            document.getElementById("resultText").innerHTML =
              "O email é produtivo";
          } else {
            document.getElementById("resultText").innerHTML =
              "O email não é produtivo";
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Wrapper>
          <Label htmlFor="formData">Informe a linguagem do arquivo</Label>
          <Select
            name="formData"
            id="formData"
            onChange={() => setLanguage}
            value={language}
          >
            <option value={"portuguese"}>Português</option>
            <option value={"english"}>English</option>
          </Select>
        </Wrapper>
        <Wrapper>
          <Label htmlFor="file">Arquivo de email (.txt ou pdf)</Label>
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
        </Wrapper>
        <Button>Enviar</Button>
      </Form>
    </Container>
  );
};
