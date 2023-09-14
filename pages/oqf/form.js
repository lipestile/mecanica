import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import axios from 'axios'
import { mask } from 'remask'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth,storage } from '../../utils/firebase'
import Layout from '../../components/Layout'
import professorValidator from '/validators/professorValidator'


const form = () => {

    
    const router = useRouter();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (!user) {
            router.push('/Login');
        }
    }, [user]);

    const { push } = useRouter()
    const { register, handleSubmit, setValue, formState: { errors }} = useForm()
    const [carros, setCarros] = useState([])
    
    useEffect(() => {
        getAll()
    }, [])

    function getAll() {
        axios.get('/api/carros').then(resultado => {
            setCarros(resultado.data)
        })
    }
    function salvar(dados) {
        axios.post('/api/oqf', dados)
        push('/oqf')
    }
    function handleChange(event) {
        setValue(event.target.name,
            (mask(event.target.value,
                event.target.getAttribute("mask"))))
    }

    return (
        <Layout>

            <Form>

            <Form.Group className="mb-3" controlId="nome">
                    <Form.Label>problema:
                    </Form.Label>
                    <Form.Control isInvalid={
                            errors.nome
                        }
                        type="text"
                        {...register('nome', professorValidator.nome)}/> {
                    errors.nome && <p className='text-danger mt-2'>
                        {
                        errors.nome.message
                    }</p>
                } 
                </Form.Group>
                <Form.Group className="mb-3" controlId="curso">
                    <Form.Label htmlFor="selectCurso">Veiculos</Form.Label>
                    <Form.Select id="selectCurso" 
                    isInvalid={
                      errors.curso
                  }
                    {...register('curso', professorValidator.curso)}>
                        <option disabled>Escolha um carro</option>
                        {
                        carros.map((item) => (
                            <option>{
                                item.modelo
                            }</option>
                        ))
                    } </Form.Select>
{
                    errors.curso && <p className='text-danger mt-2'>
                        {
                        errors.curso.message
                    }</p>
                } 
                </Form.Group>
          
                </Form>
                   
                <div className='text-center'>
                    <Button variant="success" onClick={handleSubmit(salvar)}>
                        <BsCheckLg className="me-2" />
                        Salvar
                    </Button>
                    <Link className="ms-2 btn btn-danger" href="/oqf">
                        <AiOutlineArrowLeft className="me-2" />
                        Voltar
                    </Link>
                </div>
            
        </Layout>

    )
}

export default form