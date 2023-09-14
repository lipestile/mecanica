import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import axios from 'axios'
import prfV from '/validators/carros'
import { mask } from 'remask'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth,storage } from '../../utils/firebase'
import Layout from '../../components/Layout'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'


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

    function salvar(dados) {
        axios.post('/api/carros', dados)
        push('/carros')
    }
    function handleChange(event) {
        setValue(event.target.name,
            (mask(event.target.value,
                event.target.getAttribute("mask"))))
    }

    return (
        <Layout>

            <Form>
                <Form.Group className="mb-3" controlId="modelo">
                    <Form.Label>Modelo: </Form.Label>
                    <Form.Control type="text" {...register('modelo', prfV.modelo)} />
                    {
                        errors.modelo &&
                        <small className='text-danger'>{errors.modelo.message}</small>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="nome">
                    <Form.Label>Marca: </Form.Label>
                    <Form.Control type="text" {...register('nome', prfV.nome)} />
                    {
                        errors.nome &&
                        <small className='text-danger'>{errors.nome.message}</small>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="placa">
                    <Form.Label>Placa: </Form.Label>
                    <Form.Control type="text" {...register('placa', prfV.placa)} mask="AAA9A99" onChange={handleChange} />
                    {
                        errors.placa &&
                        <small className='text-danger'>{errors.placa.message}</small>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="data">
                    <Form.Label>Ano de Fabricação: </Form.Label>
                    <Form.Control type="date"  {...register('data', prfV.data)} />
                    {
                        errors.data &&
                        <small className='text-danger'>{errors.data.message}</small>
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="cor">
                    <Form.Label>Cor: </Form.Label>
                    <Form.Control type="text" {...register('cor', prfV.cor)} />
                    {
                        errors.cor &&
                        <small className='text-danger'>{errors.cor.message}</small>
                    }
                </Form.Group>
                </Form>
                   
                <div className='text-center'>
                    <Button variant="success" onClick={handleSubmit(salvar)}>
                        <BsCheckLg className="me-2" />
                        Salvar
                    </Button>
                    <Link className="ms-2 btn btn-danger" href="/carros">
                        <AiOutlineArrowLeft className="me-2" />
                        Voltar
                    </Link>
                </div>
            
        </Layout>

    )
}

export default form