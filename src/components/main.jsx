import React from "react";
import Header from "./header";
import Hero from "./Hero";
import DeletePopUp from "./DeletePopUp";
import PopUp from "./PopUp";
import { useSelector } from "react-redux";
import propTypes from "prop-types";
const Main = ({name}) => {
  const showPopUp = useSelector((state) => state.popup.showPopUp);
  const action = useSelector((state) => state.popup.selectedOption);
  const editEmail = useSelector((state) => state.popup.email); // Correct variable name
  const deletePop = useSelector((state) => state.deletePop.showPopUp);
  const deleteEmail = useSelector((state) => state.deletePop.email);

  return (
    <div>
      {showPopUp && <PopUp action={action} email={editEmail} />}{" "}
      {/* Correctly pass email prop */}
      {deletePop && <DeletePopUp email={deleteEmail} />}
      <Header name={name} />
      <Hero />
    </div>
  );
};

export default Main;

Main.propTypes = {
  name: propTypes.string,
}
