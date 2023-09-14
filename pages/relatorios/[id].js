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
    const [carros, setCarros] = useState([])
    const [clientes, setclientes] = useState([])
    const [colaborador, setColaborador] = useState([])
    
    useEffect(() => {
        getAll()
    }, [])

    function getAll() {
        axios.get('/api/carros').then(resultado => {
            setCarros(resultado.data)
        })
    }

    useEffect(() => {
        getAlll()
    }, [])

    function getAlll() {
        axios.get('/api/clientes').then(resultado => {
            setclientes(resultado.data)
        })
    }
    useEffect(() => {
        getAllll()
    }, [])

    function getAllll() {
        axios.get('/api/colaboradores').then(resultado => {
            setclientes(resultado.data)
        })
    }

    useEffect(() => {
        if (query.id) {
            axios.get('/api/relatorios/' + query.id).then(resultado => {
                const relatorio = resultado.data

                for (let atributo in relatorio) {
                    setValue(atributo, relatorio[atributo])
                }
            })
        }
    }, [query.id])


    function salvar(dados) {
        axios.put('/api/relatorios/' + query.id, dados)
        push('/relatorios')
    }

    function handleChange(event) {
        setValue(event.target.name,
            (mask(event.target.value,
                event.target.getAttribute("mask"))))
    }
    
    
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
            
            <Form>
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

                <Form.Group className="mb-3" controlId="clientes">
                    <Form.Label htmlFor="selectClientes">Clientes</Form.Label>
                    <Form.Select id="selectClientes" 
                    isInvalid={
                      errors.curso
                  }
                    {...register('clientes', professorValidator.curso)}>
                        <option disabled>Escolha um Cliente</option>
                        {
                        clientes.map((item) => (
                            <option>{
                                item.nome
                            }</option>
                        ))
                    } </Form.Select>

                </Form.Group>
                <Form.Group className="mb-3" controlId="colaboradores">
                    <Form.Label htmlFor="selectColaboradores">colaboradores</Form.Label>
                    <Form.Select id="selectColaboradores" 
                    isInvalid={
                      errors.curso
                  }
                    {...register('Colaboradores', professorValidator.curso)}>
                        <option disabled>Escolha um Cliente</option>
                        {
                        clientes.map((item) => (
                            <option>{
                                item.nome
                            }</option>
                        ))
                    } </Form.Select>

                </Form.Group>
          
                </Form>
                   

            <div className='text-center'>
                <Button variant="success" onClick={handleSubmit(salvar)}>
                    <BsCheckLg className="me-2" />
                    Salvar
                </Button>
                <Link className="ms-2 btn btn-danger" href="/relatorios">
                    <AiOutlineArrowLeft className="me-2" />
                    Voltar
                </Link>
            </div>
        </Layout>

    )
}

export default form