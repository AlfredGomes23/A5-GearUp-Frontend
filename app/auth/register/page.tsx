import React from 'react';
import RegisterForm from '../_components/RegisterFrom';
import Link from 'next/link';

const RegisterPage = () => {
  return (
   <section className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg p-8 shadow-lg hover:shadow-sm hover:shadow-primary ">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">
            Greetings <span className="text-primary">!</span>
          </h1>
          <p className="text-primary"> Register A New Account . </p>

          {/* form */}
          <RegisterForm />
          
          <p className="text-right italic">
            Already Have An Account?{" "}
            <Link
              className="underline hover:underline-offset-4 hover:text-primary"
              href={"/auth/login"}
            >
              Login
            </Link>{" "}
             here.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;