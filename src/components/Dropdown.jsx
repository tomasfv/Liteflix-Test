import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopulares } from "../actions";
import "./Dropdown.css";
import Card from "./Card.jsx";

export default function Dropdown() {
  const dispatch = useDispatch();
  const populares = useSelector((state) => state.populares);
  const primerasPopulares = populares.results && populares.results.slice(0, 4);
  let getStorage = JSON.parse(localStorage.getItem("ListaStorage"));

  const [lista, setLista] = useState(getStorage ? getStorage : []);
  const [cambioSelect, setCambioSelect] = useState("populares");

  useEffect(() => {
    dispatch(getPopulares());
  }, [dispatch]);

  useEffect(() => {
    if (getStorage !== null) {
      setLista(getStorage); //setea la lista con la data del localStorage
    }

    if (getStorage !== null && lista.length !== getStorage.length) {
      setLista(getStorage);
    }

    if (getStorage === null) {
      setLista([]);
    }
    // eslint-disable-next-line
  }, [getStorage && getStorage.length]);

  function handleSelect(e) {
    e.preventDefault();
    if (e.target.value === "borrar") {
      localStorage.removeItem("ListaStorage");
    }
    setCambioSelect(e.target.value);
  }

  return (
    <div className="drop-container">
      <div className="drop-select">
        <p>Ver:</p>
        <select className="drop-options" onChange={(e) => handleSelect(e)}>
          <option className="drop-option" value="populares">
            Populares
          </option>
          <option className="drop-option" value="mis-peliculas">
            Mis Peliculas
          </option>
          <option className="drop-option" value="borrar">
            Eliminar Mi Lista
          </option>
        </select>
      </div>

      {cambioSelect === "populares"
        ? primerasPopulares && (
            <div>
              {primerasPopulares.map((el) => {
                return (
                  <Card
                    key={el.title}
                    title={el.original_title}
                    image={
                      "https://image.tmdb.org/t/p/original" + el.backdrop_path
                    }
                    date={el.release_date && el.release_date.slice(0, 4)}
                    rating={el.vote_average}
                  />
                );
              })}
            </div>
          )
        : lista && (
            <div>
              {lista.map((el) => {
                return <Card key={el.title} title={el.title} image={el.img} />;
              })}
            </div>
          )}
    </div>
  );
}
