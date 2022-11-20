import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import FormContainer from "../components/FormContainer.js";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const nav = useNavigate();
  const dispatch = useDispatch();

  if (!shippingAddress.address) {
    nav("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    nav("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" className="btn btn-lg btn-primary mt-3 mx-auto">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
