import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Layout from "../components/Layout";
import Link from "next/link";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
export default function Home() {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (!user) {
            router.push('/Login');
        }
    }, [user]);
    return (
        <Layout titulo='Pagina Inicial'>
            <Container className="mt-5">

                <Row className="justify-content-md-center" >
                    <Col md='auto'>
                        <Card border='black' style={{ width: '15rem' }}>
                            <Card.Img variant="top" src="/images/carro.png" />
                            <Card.Body>
                                <Card.Title>Veículos</Card.Title>
                                <Card.Text>
                                    Dados Veiculos
                                </Card.Text>
                                <Button variant="outline-danger" >
                                    <Link
                                        href='/carros'
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black'
                                        }}>
                                        Automóveis
                                    </Link>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md='auto'>
                        <Card border="danger" style={{ width: '15rem' }}>
                            <Card.Img variant="top" src="/images/dono.png" />
                            <Card.Body>
                                <Card.Title>Clientes </Card.Title>
                                <Card.Text>
                                    Dados dados clientes
                                </Card.Text>
                                <Button variant="outline-dark" >
                                    <Link
                                        href='/clientes'
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black'


                                        }}>
                                        Proprietário
                                    </Link>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md='auto'>
                        <Card border="dark" style={{ width: '15rem' }} >
                            <Card.Img variant="top" src="/images/funcionario.png" />
                            <Card.Body>
                                <Card.Title>Colaborador</Card.Title>
                                <Card.Text>
                                    Dados do funcionário
                                </Card.Text>
                                <Button variant="outline-danger" >
                                    <Link
                                        href='/colaboradores'
                                        style={{
                                            textDecoration: 'none',
                                            color: 'Black'


                                        }}>
                                        Funcionário
                                    </Link>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-md-center mt-5">
                    <Col md='auto'>
                        <Card border="danger" style={{ width: '15rem' }}>
                            <Card.Img variant="top" src="/images/problema.png" />
                            <Card.Body>
                                <Card.Title>O QUE VOU FAZER ?</Card.Title>
                                <Card.Text>
                                    Breve relatorio do que será feito
                                </Card.Text>
                                <Button variant="outline-dark" >
                                    <Link
                                        href='/oqf'
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black'


                                        }}>
                                        Descrição do serviço
                                    </Link>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md='auto'>
                        <Card border="dark" style={{ width: '15rem' }}>
                            <Card.Img variant="top" src="/images/realatorio.png" />
                            <Card.Body>
                                <Card.Title>PDF</Card.Title>
                                <Card.Text>
                                    Reuni todos os dados
                                </Card.Text>
                                <Button variant="outline-danger" >
                                    <Link
                                        href='/relatorios'
                                        style={{
                                            textDecoration: 'none',
                                            color: 'Black'
                                        }}>
                                        Relatório
                                    </Link>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}