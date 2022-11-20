import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  const nav = useNavigate();
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      nav(`/?keyword=${keyword}&page=1`);
    } else {
      nav(nav(location.pathname));
    }
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>

      <Button type="submit" variant="success" className="pt-2 ml-2">
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
