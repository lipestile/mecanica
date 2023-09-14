import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { mask } from 'remask'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, storage } from '../../utils/firebase'
import Layout from '../../components/Layout'
import axios from 'axios'
import professorValidator from '/validators/professorValidator'


const form = () => {

    const router = useRouter();
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (!user) {
            router.push('/Login');
        }
    }, [user]);

    const { push, query } = useRouter();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm()

    useEffect(() => {
        if (query.id) {
            axios.get('/api/oqf/' + query.id).then(resultado => {
                const oqfs = resultado.data

                for (let atributo in oqfs) {
                    setValue(atributo, oqfs[atributo])
                }
            })
        }
    }, [query.id])


    function salvar(dados) {
        axios.put('/api/oqf/' + query.id, dados)
        push('/oqf')
    }

    function handleChange(event) {
        setValue(event.target.name,
            (mask(event.target.value,
                event.target.getAttribute("mask"))))
    }
    const [carros, setCarros] = useState([])
    
    useEffect(() => {
        getAll()
    }, [])

    function getAll() {
        axios.get('/api/carros').then(resultado => {
            setCarros(resultado.data)
        })
    }

    return (
        <Layout>
            
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
                <Form.Group className="mb-3" controlId="cursos">
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