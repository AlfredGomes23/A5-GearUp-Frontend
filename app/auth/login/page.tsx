import Link from "next/link";
import LoginForm from "../_components/LoginForm";

const LoginPage = async () => {
  return (
    <section className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg p-8 shadow-lg hover:shadow-sm hover:shadow-primary ">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">
            Welcome Back <span className="text-primary">!</span>
          </h1>
          <p className="text-primary"> Login to Access your Account. </p>

          {/* form */}
          <LoginForm />
          
          <p className="text-right italic">
            New here?{" "}
            <Link
              className="underline hover:underline-offset-4 hover:text-primary"
              href={"/auth/register"}
            >
              Register
            </Link>{" "}
            new account here.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
