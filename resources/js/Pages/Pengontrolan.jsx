import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

const Pengontrolan = (props) => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const [pompa, setPompa] = useState({
        campuran: "mati",
    });
    const [disableSwitch, setDisableSwitch] = useState(false);

    const [data, setData] = useState([]);
    const [loadingJadwal, setLoadingJadwal] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const getJadwal = async () => {
            try {
                const response = await axios.get(`${baseUrl}/jadwal`);
                setData(response.data.formattedData);
            } catch (error) {
                console.error("error getJadwal", error);
            } finally {
                setTimeout(() => {
                    setLoadingJadwal(false);
                }, 2000);
            }
        };

        getJadwal();
    }, [pompa]);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        const handleCommand = async () => {
            try {
                await axios.post(`${baseUrl}/command`, pompa);
            } catch (error) {
                console.error("errorHandleCommand=>", error);
            }
        };

        handleCommand();
    }, [pompa]);

    useEffect(() => {
        setTimeout(() => {
            setPompa({ ...pompa, campuran: "mati" });
        }, 30000);
        setDisableSwitch(false);
    }, [disableSwitch]);

    const handleCheckboxChange = (type, isChecked) => {
        setPompa((prevPompa) => ({
            ...prevPompa,
            [type]: isChecked ? "hidup" : "mati",
        }));
        setDisableSwitch(true);
    };

    return (
        <>
            <Head title="Pengontrolan" />
            <Navbar user={props.auth.user} />
            <div className="w-full min-h-screen flex flex-row justify-center items-center gap-4 flex-wrap">
                <div className="flex flex-col justify-center items-center">
                    <span>Pompa Campuran</span>
                    <div className="flex flex-row justify-between items-center gap-2">
                        <span>off</span>
                        <input
                            type="checkbox"
                            className="toggle"
                            onChange={(e) =>
                                handleCheckboxChange(
                                    "campuran",
                                    e.target.checked
                                )
                            }
                            disabled={disableSwitch}
                            checked={pompa.campuran === "hidup"}
                        />
                        <span>on</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    {loadingJadwal ? (
                        <span className="loading loading-bars loading-lg"></span>
                    ) : !loadingJadwal && data.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>
                                                Tanggal & Waktu Pupuk Campuran
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {currentData.map((item, index) => (
                                            <tr key={index}>
                                                <th>
                                                    {indexOfFirstItem +
                                                        index +
                                                        1}
                                                </th>
                                                <td>
                                                    {dayjs(item.cts).format(
                                                        "DD-MM-YYYY | HH:mm:ss"
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="pagination flex items-center space-x-2 mt-4">
                                <button
                                    onClick={handleBack}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                                >
                                    Back
                                </button>
                                <span>
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    ) : (
                        <span>belum ada histori penjadwalan</span>
                    )}
                </div>
            </div>
        </>
    );
};

export default Pengontrolan;
