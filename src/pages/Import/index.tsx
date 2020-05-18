import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import alert from '../../assets/alert.svg';
import FileList from '../../components/FileList';
import Header from '../../components/Header';
import Upload from '../../components/Upload';
import api from '../../services/api';
import { Container, Footer, ImportFileContainer, Title } from './styles';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();
  async function handleUpload(): Promise<void> {
    const data = new FormData();

    if (!uploadedFiles.length) return;

    data.append('file', uploadedFiles[0].file);

    try {
      await api.post('/transactions/import', data);
      Swal.fire({
        icon: 'success',
        title: 'Você enviou os arquivos com sucesso!',
        text: 'Tudo certo por aqui.',
        confirmButtonColor: '#ff813f',
        onDestroy: () => {
          history.goBack();
        },
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Um erro ocorreu!',
        text: 'Tente novamente',
        confirmButtonColor: '#f8355e',
      });
    }
  }

  function submitFile(files: File[]): void {
    const filesToUpload = files.map(file => ({
      file,
      name: file.name,
      readableSize: String(file.size),
    }));

    setUploadedFiles(filesToUpload);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
