import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const Search = ({ setInput }) => {
  const [text, setText] = useState("");
  const { register, handleSubmit, watch, errors } = useForm();

  const changeInput = (e) => {
    setText(e);
    setInput(e);
  };
  return (
    <div className="text-center my-4">
        <h1>Applicacion de clima</h1>
      <input
        className="input"
        type="text"
        onChange={(e) => changeInput(e.target.value)}
        placeholder="ingrese un lugar..."
      />
    </div>
  );
};

export default Search;
