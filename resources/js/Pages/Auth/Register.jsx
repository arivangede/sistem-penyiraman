import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const Register = (props) => {
    const [form, setForm] = useState({
        username: "",
        full_name: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const errorServer = props.errors;

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/register", form);
    };

    useEffect(() => {
        if (!showAlert) {
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    }, [errorServer]);

    console.log("props=>", props);
    return (
        <>
            <Head title="Register" />
            <div className="w-full min-h-screen flex gap-4 flex-wrap justify-center items-center relative">
                <div
                    role="alert"
                    className={`alert alert-error max-w-60 flex absolute top-4 scale-0 transition duration-300 ease-in-out origin-top ${
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
                            <span key={index} className="text-le">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="p-4 flex flex-col justify-center items-center gap-4 border border-slate-400 rounded-xl">
                    <h1 className="text-xl font-bold">Register</h1>
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
                            type="text"
                            placeholder="Fullname"
                            className="input input-bordered"
                            value={form.full_name}
                            onChange={(e) =>
                                setForm({ ...form, full_name: e.target.value })
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
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={`input input-bordered ${
                                error
                                    ? "border border-red-500 outline-red-500 focus:border-red-500 focus:outline-red-500"
                                    : ""
                            }`}
                            onChange={(e) => {
                                const input = e.target.value;
                                if (input == "") {
                                    setError(null);
                                } else if (input !== form.password) {
                                    setError("Confirm password not match!");
                                } else {
                                    setError(null);
                                }
                            }}
                        />
                        {error && (
                            <span className="text-sm text-red-500">
                                {error}
                            </span>
                        )}
                        <button
                            type="submit"
                            className={`btn btn-outline hover:bg-green-500 w-full`}
                        >
                            Submit
                        </button>
                    </form>
                    <Link
                        href="/login"
                        className="underline text-sm self-start"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Register;
