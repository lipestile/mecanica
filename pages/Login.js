import React, { Component, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Image, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';


function Login() {
  const [mostrarDiv, setMostrarDiv] = useState(false);

  const adicionarDiv = () => {
    setMostrarDiv(true);
  };

  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  //Sign in with google
  const googlProvider = new GoogleAuthProvider();

  const SignInBtnHandler = async () => {
    try {
      const result = await signInWithPopup(auth, googlProvider);
      route.push("/");
      toast.success("Successfully logged in!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
        hideProgressBar: true,
      })
    } catch (err) {
      toast.error("Authentication failed!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
        hideProgressBar: true,
      })
    }
  };

  useEffect(() => {
    if (user) {
      route.push("/");
    }
  }, [user]);


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Garage<strong>Pro</strong></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="justify-content-end flex-grow-1 ">
              <Button onClick={SignInBtnHandler} variant='outline-danger' className='bg-dark text-white'>Login{'   '}<FcGoogle/></Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row className='mt-5'>
        <Col md={6} className='text-center mt-5'>
          <h1 className='mt-5 '>
            <strong style={{ fontSize: '60px' }}>GaragePro</strong>
          </h1>
          <br></br>
          <div className='text-left'>
            <p style={{ fontSize: '27px' }}>Organize, agilize, otimize!<br></br>Sua garagem em nosso site!</p>
          </div>
          <Button variant='outline-danger' onClick={adicionarDiv} className='p-3'><strong>SOBRE NÓS</strong></Button>

        </Col>
        <Col md={6}>
          <Image src='/images/logo.png'></Image>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5 mb-4">
        <Col md='auto'>
          {mostrarDiv && <>
            <Card border="dark" style={{ maxWidth: '50rem' }}>
              <Card.Header
                className='bg-danger outline-dark text-white text-center p-3'
                style={{ fontSize: '30px' }}

              >
                <strong>Sobre Nós</strong>

              </Card.Header>
              <Card.Body>
                <Card.Text className='text-center'>
                  Bem-vindo à "GaragePro" - sua parceira digital na indústria automotiva! Somos uma empresa especializada no desenvolvimento de sites personalizados e inovadores para auxiliar mecânicos e oficinas em suas atividades diárias.

                  Ao criar um site conosco, você terá acesso a uma plataforma completa e altamente funcional. Nossa equipe de desenvolvedores e designers está empenhada em projetar sites que reflitam a identidade da sua oficina, enquanto fornecem recursos específicos para aprimorar seu negócio.

                  Nossos sites são cuidadosamente projetados para fornecer uma experiência de usuário excepcional. Navegação intuitiva, layout responsivo e design atraente são apenas alguns dos aspectos que consideramos ao criar sua plataforma online.

                  Além disso, oferecemos uma ampla gama de recursos e funcionalidades específicas para mecânicos. Seu site pode incluir uma área de agendamento online, onde os clientes podem marcar facilmente um horário para o serviço. Também podemos integrar um sistema de gerenciamento de estoque para que você possa controlar com eficiência suas peças e materiais.

                  Adicionalmente, fornecemos espaços para exibir depoimentos de clientes satisfeitos, compartilhar informações sobre serviços oferecidos e até mesmo compartilhar dicas úteis sobre manutenção veicular.

                  Na TechMech Solutions, acreditamos na importância do suporte contínuo. Assim, mesmo após o lançamento do seu site, estaremos à disposição para oferecer assistência técnica, atualizações e melhorias adicionais.

                  Se você é um mecânico ou dono de oficina em busca de um site profissional e eficiente para impulsionar seu negócio, não procure mais. A TechMech Solutions está aqui para ajudar você a alcançar seus objetivos.

                  Entre em contato conosco hoje mesmo e juntos construiremos um site personalizado que atenda às suas necessidades específicas, fortalecendo sua presença online e levando seu sucesso mecânico a um novo patamar.
                </Card.Text>
              </Card.Body>
            </Card>
          </>}
        </Col>
      </Row>

    </>
  )
}
export default Login;
