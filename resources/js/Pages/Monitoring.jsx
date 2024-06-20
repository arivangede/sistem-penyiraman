import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/react";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const Monitoring = (props) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/sensor-data`);
                setData(response.data.data);
            } catch (error) {
                console.error("error fetching history=>", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };

        fetchData();
    }, []);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Get current page data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

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

    return (
        <>
            <Head title="Monitoring" />
            <Navbar user={props.auth.user} />
            <div className="w-full min-h-screen flex flex-col justify-center items-center">
                {loading ? (
                    <span className="loading loading-bars loading-lg"></span>
                ) : !loading && data.length > 0 ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Tingkat Kelembaban Tanah</th>
                                        <th>Tanggal & Waktu</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {currentData.map((item, index) => (
                                        <tr key={index}>
                                            <th>
                                                {indexOfFirstItem + index + 1}
                                            </th>
                                            <td>{item.kelembaban}</td>
                                            <td>
                                                {dayjs(item.created_at).format(
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
                    <span>belum ada data histori sensor kelembaban.</span>
                )}
            </div>
        </>
    );
};

export default Monitoring;
