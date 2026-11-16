import React from "react";
import LoginHero from "../components/login/LoginHero";
import LoginForm from "../components/login/LoginForm";

export default function LoginScreen() {
  return (
    <>
      <div className="container grid lg:grid-cols-2 gap-10 py-10 mx-auto items-center">
        <LoginHero />
        <LoginForm />
      </div>
    </>
  );
}
