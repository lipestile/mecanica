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

    
    const [relatorios, setrelatorios] = useState([])

    useEffect(() => {
        getAll()
    }, [])

    function getAll(){
        axios.get('/api/relatorios').then( resultado => {
            setrelatorios(resultado.data);
        })
    }
    
    function excluir(id){
        if (confirm('Deseja realmente excluir o registro?')) { 
        axios.delete('/api/relatorios/' + id)
        getAll()
        }
    }


  return (
    <Layout titulo='Relatório'>
       <Link href="/relatorios/form" className='mb-2 btn btn-danger'>
                Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>colaborador</th>
                        <th>Veiculos</th>
                        <th>Dono</th>
                    </tr>
                </thead>
                <tbody>
                    {relatorios.map( item => (
                        <tr key={item.id}>
                            <td>
                                <Link href={'/relatorios/' + item.id}>
                                    <BsPencilFill title="Alterar" className='text-primary' />
                                </Link>
                                {' '}
                                <BsFillTrash3Fill title="Excluir" onClick={() => excluir(item.id)} className='text-danger' />
                            </td>
                            <td>{item.Colaboradores}</td>
                            <td>{item.curso}</td>
                            <td>{item.clientes}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
    </Layout>
  )
}

export default index
