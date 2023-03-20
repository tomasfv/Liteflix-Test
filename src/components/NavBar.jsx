import React from "react";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { TfiBell } from "react-icons/tfi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RiAccountCircleFill } from "react-icons/ri";
import { BsPlusLg } from "react-icons/bs";
import { openModal } from "../actions";

export default function NavBar() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  function handleModal(e) {
    e.preventDefault();
    if (modal === false) {
      dispatch(openModal(true));
    } else {
      dispatch(openModal(false));
    }
  }

  return (
    <div className="nav-container">
      <div className="nav-logo">
        <p className="nav-lite">LITE</p>
        <p className="nav-flix">FLIX</p>
      </div>
      <p onClick={(e) => handleModal(e)} className="plus-icon">
        <BsPlusLg />
      </p>
      <button className="nav-agregar" onClick={(e) => handleModal(e)}>
        AGREGAR PELICULA
      </button>
      <p className="menu-icon">
        <HiOutlineMenuAlt3 />
      </p>
      <p className="bell-icon">
        <TfiBell />
      </p>
      <p className="avatar-icon">
        <RiAccountCircleFill />
      </p>
    </div>
  );
}
