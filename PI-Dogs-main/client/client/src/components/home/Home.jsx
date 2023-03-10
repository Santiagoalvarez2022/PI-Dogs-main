import React, { useEffect, useState } from "react";
import Card from "../card/Card";
import { useDispatch, useSelector } from 'react-redux'
import { sumar, dataApi, get_dogs } from "../../redux/actions";
import style from './Home.module.css'
import Loanding from "../loanding/Loading";
import Paginado from "../paginado/paginado";
import CardData from "./Card_data";

const Home = (props) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state.dogs)
  const [state, setState] = useState([])
  const [inicio, setInicio] = useState(0)
  const [fin, setFin] = useState(7)

  const numberPage = useSelector((state)=> state.numberPage)

  useEffect(() => {
    dispatch(get_dogs())
  }, [])

  const [valuePage, SetValuePage] = useState(1)
  const [finDogs, setFinDogs] = useState(8) // VALOR INCIAL DE CANTIDAD DE PERROSS

  const finalpage = finDogs * valuePage
  const InicioPage = finalpage - finDogs

  const totalPages = Math.ceil(selector.length/finDogs)
  
  const Next = (valuePage) => {
    if(valuePage === totalPages) return
    let pag = valuePage + 1
    SetValuePage(pag)
  }
  const back = (valuePage) => {
    if(valuePage === 1 ) return
    let pag = valuePage - 1
    SetValuePage(pag)
  }

  if(!Object.keys(selector).length){
    return(
      <Loanding />
    )
  } else {
    return (
      <div className={style.all}>
        <CardData />
        <div className={style.conteiner_page}>
            {selector[0].error ?<div className={style.error}><h3>{selector[0].error}</h3> <form action=""><button>Ver todos</button></form> </div> 
            
            : <div className={style.conteiner}>
            { selector.length>0 ?  selector.slice(InicioPage, finalpage).map((dog) => {
              const { name, id,  image, temperament, max ,min } = dog
              return <Card
                indice={selector.indexOf(dog)}
                name={name}
                key={id}
                id={id}
              
                image={image}
                temperament={temperament}
                max = {max} 
                min= {min}
              />
            }) : null  }
          </div>}
        </div>
        <Paginado />

      </div>
    )
  }
}
//se encarga de proposionarle el store de redux a las props de este componente props ahora es un obj con la propiedad dogs = valor global del store

export default Home;


/*
  menu(selector.length)
   function menu(num){
    num = Math.ceil(num /8) + 3 
    let cantd_indices = [] 
    while(num > 0){
      cantd_indices.unshift(num)
      
      num--
    } 
    setState(cantd_indices)
   }
  
  const handlerIndice = (e)=>{
    let id = parseInt(e.target.id)
    if(id === 1){
      setInicio(0)
      setFin(8)
      return
    }        
    let fin = (id * 7) + 2
    let inicio = fin - 8
    console.log(inicio, fin)
    setInicio(inicio)
    setFin(fin)


    <nav className={style.indice}>
            <h2>total de perro : {selector.length}</h2>
            <ul>  
            {selector.length ? state.map((indice)=>{
              return (
                <li key={indice} id={indice} onClick={(e)=>handlerIndice(e)} >{indice}</li>
              )
           }) : null}
             </ul>
          </nav>
  } 
  */
