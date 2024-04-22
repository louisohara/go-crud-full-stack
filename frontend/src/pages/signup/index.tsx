import SignupForm from "@/components/signup-form";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SignupPage() {
  const router = useRouter();
  const handleClose = (location: string) => {
    router.push(`/${location}`);
  };
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex w-full items-end rounded-lg bg-[#f19305] p-3 h-full">
          <div className="w-full text-center text-white text-2xl h-full">
            SIGNUP
          </div>
        </div>
        <section className="w-full h-full form">
          <SignupForm />
        </section>
      </div>
      <div
        className="modal fade backdrop-blur-sm"
        id="signupModal"
        tabIndex={-1}
        aria-labelledby="signupModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Signup successful</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Admin user created</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                type="button"
                onClick={() => handleClose("login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
