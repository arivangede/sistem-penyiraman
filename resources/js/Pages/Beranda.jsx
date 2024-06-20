import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import kelembaban from "@/assets/kelembaban.svg";

const Beranda = (props) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const [tanah, setTanah] = useState(0);
    const [air, setAir] = useState(0);
    const [campuran, setCampuran] = useState(0);

    const persentaseCampuran = Math.floor((campuran / 60) * 100).toFixed(2);
    const persentaseAir = Math.floor((air / 60) * 100).toFixed(2);

    const [loading, setLoading] = useState(true);

    const indicatorCampuran = () => {
        if (persentaseCampuran < 20) {
            return "bg-red-400";
        } else if (persentaseCampuran >= 20 && persentaseCampuran < 50) {
            return "bg-amber-400";
        } else if (persentaseCampuran >= 50) {
            return "bg-sky-400";
        }
    };

    const indicatorAir = () => {
        if (persentaseAir < 20) {
            return "bg-red-400";
        } else if (persentaseAir >= 20 && persentaseAir < 50) {
            return "bg-amber-400";
        } else if (persentaseAir >= 50) {
            return "bg-sky-400";
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get(`${baseUrl}/sensor`);
                const response2 = await axios.get(`${baseUrl}/volume`);
                setTanah(response1.data.kelembaban);
                setAir(response2.data.air);
                setCampuran(response2.data.campuran);
            } catch (error) {
                console.error("fetchError=>", error);
            } finally {
                setLoading(false);
            }
        };

        setInterval(() => fetchData(), 5000);
    }, []);

    return (
        <>
            <Head title="Beranda" />
            <Navbar user={props.auth.user} />
            <div className="w-full min-h-screen flex flex-col justify-center items-center">
                <div className="w-full flex justify-center items-center flex-wrap gap-4">
                    <div className="flex flex-col justify-center items-center gap-4 w-40">
                        <span>Kelembaban Tanah</span>
                        <img src={kelembaban} alt="kelembabanIcon" />
                        <span>{tanah} % RH</span>
                    </div>
                    <div className="flex justify-center items-center gap-4 w-full sm:w-auto">
                        <div className="flex flex-col justify-center items-center w-40">
                            <div className="w-10 h-80 border border-slate-400 relative rounded-full overflow-hidden">
                                <div
                                    className={`absolute bottom-0 ${indicatorCampuran()} w-full transition-all duration-1000 ease-in-out`}
                                    style={{ height: persentaseCampuran + "%" }}
                                ></div>
                            </div>
                            <h1>Volume Campuran</h1>
                            <span>{campuran} liter</span>
                        </div>
                        <div className="flex flex-col justify-center items-center w-40">
                            <div className="w-10 h-80 border border-slate-400 relative rounded-full overflow-hidden">
                                <div
                                    className={`absolute bottom-0 ${indicatorAir()} w-full transition-all duration-1000 ease-in-out`}
                                    style={{ height: persentaseAir + "%" }}
                                ></div>
                            </div>
                            <h1>Volume Air</h1>
                            <span>{air} liter</span>
                        </div>
                    </div>
                </div>
                {loading && (
                    <>
                        <span className="loading loading-bars loading-lg"></span>
                        <h1>Menghubungkan</h1>
                    </>
                )}
            </div>
        </>
    );
};

export default Beranda;
