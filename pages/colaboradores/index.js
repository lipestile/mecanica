import React, { useState } from 'react'
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth} from "/utils/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import Layout from "/components/Layout";
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Link from 'next/link';
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs';

const index = () => {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
  
    useEffect(() => {
      if(!user){
        router.push('/Login');
      }
    },[user]);

    
    const [colaboradores, setcolaboradores] = useState([])

    useEffect(() => {
        getAll()
    }, [])

    function getAll(){
        axios.get('/api/colaboradores').then( resultado => {
            setcolaboradores(resultado.data);
        })
    }
    
    function excluir(id){
        if (confirm('Deseja realmente excluir o registro?')) { 
        axios.delete('/api/colaboradores/' + id)
        getAll()
        }
    }


  return (
    <Layout titulo='Colaboradores'>
       <Link href="/colaboradores/form" className='mb-2 btn btn-danger'>
                Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>função</th>
                    </tr>
                </thead>
                <tbody>
                    {colaboradores.map( item => (
                        <tr key={item.id}>
                            <td>
                                <Link href={'/colaboradores/' + item.id}>
                                    <BsPencilFill title="Alterar" className='text-primary' />
                                </Link>
                                {' '}
                                <BsFillTrash3Fill title="Excluir" onClick={() => excluir(item.id)} className='text-danger' />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.bairro}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
    </Layout>
  )
}

export default index
