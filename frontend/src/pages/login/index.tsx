import LoginForm from "@/components/login-form";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  const handleClose = (location: string) => {
    router.push(`/${location}`);
  };
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="relative m-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ">
        <div className="flex w-full items-end rounded-lg bg-[#f19305] p-3 h-full">
          <div className="w-full text-center text-white text-2xl h-full">
            LOGIN
          </div>
        </div>
        <section className="w-full h-full form">
          <LoginForm />
        </section>
      </div>
      <div
        className="modal fade backdrop-blur-sm"
        id="loginModal"
        tabIndex={-1}
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login successful</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>You can now access user data</p>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => handleClose("")}
                className="btn btn-primary"
                data-bs-dismiss="modal"
                type="button"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
