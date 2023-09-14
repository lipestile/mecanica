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
            axios.get('/api/colaboradores/' + query.id).then(resultado => {
                const colaborador = resultado.data

                for (let atributo in colaborador) {
                    setValue(atributo, colaborador[atributo])
                }
            })
        }
    }, [query.id])


    function salvar(dados) {
        axios.put('/api/colaboradores/' + query.id, dados)
        push('/colaboradores')
    }

    function handleChange(event) {
        setValue(event.target.name,
            (mask(event.target.value,
                event.target.getAttribute("mask"))))
    }

    return (
        <Layout>
            <Form.Group className="mb-3" controlId="nome">
                    <Form.Label>Nome:
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
                } </Form.Group>

                <Form.Group className="mb-3" controlId="cpf">
                    <Form.Label>CPF:
                    </Form.Label>
                    <Form.Control isInvalid={
                            errors.cpf
                        }
                        type="text"
                        {...register('cpf', professorValidator.cpf)}/> {
                    errors.cpf && <p className='text-danger mt-2'>
                        {
                        errors.cpf.message
                    }</p>
                } </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email:
                    </Form.Label>
                    <Form.Control type="email"
                        isInvalid={
                            errors.email
                        }
                        {...register('email', professorValidator.email)}/> {
                    errors.email && <p className='text-danger mt-2'>
                        {
                        errors.email.message
                    }</p>
                } </Form.Group>

                <Form.Group className="mb-3" controlId="telefone">
                    <Form.Label>Telefone:
                    </Form.Label>
                    <Form.Control type="text"
                        isInvalid={
                            errors.telefone
                        }
                        {...register('telefone', professorValidator.telefone)}/> {
                    errors.telefone && <p className='text-danger mt-2'>
                        {
                        errors.telefone.message
                    }</p>
                } </Form.Group>

                <Form.Group className="mb-3" controlId="cep">
                    <Form.Label>CEP:
                    </Form.Label>
                    <Form.Control type="text"
                        isInvalid={
                            errors.cep
                        }
                        {...register('cep', professorValidator.cep)}/> {
                    errors.cep && <p className='text-danger mt-2'>
                        {
                        errors.cep.message
                    }</p>
                } </Form.Group>

                <Form.Group className="mb-3" controlId="bairro">
                    <Form.Label>Função:
                    </Form.Label>
                    <Form.Control type="text"
                        isInvalid={
                            errors.bairro
                        }
                        {...register('bairro', professorValidator.bairro)}/> {
                    errors.bairro && <p className='text-danger mt-2'>
                        {
                        errors.bairro.message
                    }</p>
                } </Form.Group>               
                   

            <div className='text-center'>
                <Button variant="success" onClick={handleSubmit(salvar)}>
                    <BsCheckLg className="me-2" />
                    Salvar
                </Button>
                <Link className="ms-2 btn btn-danger" href="/colaboradores">
                    <AiOutlineArrowLeft className="me-2" />
                    Voltar
                </Link>
            </div>
        </Layout>

    )
}

export default form