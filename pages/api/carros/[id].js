import { child, get, ref, remove, set, update } from "firebase/database"
import { v4 } from "uuid"
import { db } from "../../../utils/firebase"

export default function handler(req, res) {

  const id = req.query.id

  if (req.method == 'GET') {

    get(child(ref(db), 'carros/' + id)).then(snapshot=>{
      res.status(200).json(snapshot.val())
      })

  } else if (req.method == 'PUT') {

    const dados = req.body
    update(ref(db, 'carros/' + id), dados)
    res.status(200).json(dados)

  } else if (req.method == 'DELETE') {

    remove(ref(db, 'carros/' + id))
    
    res.status(200).json(id)
  }

}
