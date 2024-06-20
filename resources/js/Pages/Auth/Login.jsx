import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Login = (props) => {
    console.log(props);
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [showAlert, setShowAlert] = useState(false);

    const errorServer = props.errors;

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/login", form);
    };

    useEffect(() => {
        if (!showAlert) {
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    }, [errorServer, props.flash.message]);

    return (
        <>
            <Head title="Login" />
            <div className="w-full min-h-screen flex gap-4 justify-center items-center flex-wrap relative">
                <div
                    role="alert"
                    className={`alert alert-success max-w-60 flex absolute top-4 scale-0 transition duration-300 origin-top ease-in-out ${
                        showAlert && props.flash.message && "scale-100"
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{props.flash.message}</span>
                </div>

                <div
                    role="alert"
                    className={`alert alert-error max-w-60 flex absolute top-4 scale-0 transition duration-300 origin-top ease-in-out ${
                        showAlert &&
                        Object.keys(errorServer).length > 0 &&
                        "scale-100"
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <div className="flex flex-col">
                        {Object.values(errorServer).map((item, index) => (
                            <span key={index} className="text-left">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="p-4 flex flex-col justify-center items-center gap-4 border border-slate-400 rounded-xl">
                    <h1 className="text-xl font-bold">Login</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-center items-center gap-2"
                    >
                        <input
                            type="text"
                            placeholder="Username"
                            className="input input-bordered"
                            value={form.username}
                            onChange={(e) =>
                                setForm({ ...form, username: e.target.value })
                            }
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />
                        <button
                            type="submit"
                            className="btn btn-outline hover:bg-green-500 w-full"
                        >
                            Submit
                        </button>
                    </form>
                    <Link
                        href="/register"
                        className="underline text-sm self-start"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;
