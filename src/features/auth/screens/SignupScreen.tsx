import React from "react";
import SignupHero from "../components/signup/Signuphero";
import SignupForm from "../components/signup/SignupForm";

export default function SignupScreen() {
  return (
    <>
      <div className="container grid lg:grid-cols-2 gap-10 py-10 mx-auto items-center">
        <SignupHero />
        <SignupForm />
      </div>
    </>
  );
}
