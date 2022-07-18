import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head } from "@inertiajs/inertia-react";
import SideBar from "@/Components/Dashboard/Sidebar";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isNotif, setIsNotif] = useState(false);
    
    const handleSubmit = () => {
        const data = {
            title,
            description,
            category,
        };


        Inertia.post("/admin-page/news", data);
        setTitle("");
        setDescription("");
        setCategory("");
        setIsNotif(true);
    };

    useEffect(() => {
        if (!props.news) {
            Inertia.get("/admin-page/news");
        }
        return;
    }, []);

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="flex">
                <SideBar />

                <div className="py-2 w-full">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <h1>News</h1>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                {isNotif && (
                                    <div className="alert alert-success shadow-lg">
                                        <div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="stroke-current flex-shrink-0 h-6 w-6"
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
                                            <span>
                                                {props.flash.message}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <input
                                    type="text"
                                    placeholder="Judul"
                                    className="m-2 input input-bordered w-full"
                                    onChange={(title) =>
                                        setTitle(title.target.value)
                                    }
                                    value={title}
                                />
                                <input
                                    type="text"
                                    placeholder="Deskripsi"
                                    className="m-2 input input-bordered w-full"
                                    onChange={(description) =>
                                        setDescription(description.target.value)
                                    }
                                    value={description}
                                />
                                <input
                                    type="text"
                                    placeholder="Kategori"
                                    className="m-2 input input-bordered w-full"
                                    onChange={(category) =>
                                        setCategory(category.target.value)
                                    }
                                    value={category}
                                />
                                <button
                                    className="btn btn-primary m-2"
                                    onClick={() => handleSubmit()}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Title</th>
                                    <th>Desc</th>
                                    <th>Author</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.news &&
                                props.news.data.length > 0 ? (
                                    props.news.data.map((data, i) => {
                                        return (
                                            <tr className="hover" key={i}>
                                                <th>{i + 1}</th>
                                                <td>
                                                    {data.title.substring(
                                                        0,
                                                        30
                                                    ) + "..."}
                                                </td>
                                                <td>
                                                    {data.description.substring(
                                                        0,
                                                        20
                                                    ) + "..."}
                                                </td>
                                                <td><div className="badge badge-inline">
                                                    {data.users.name}</div></td>
                                                <td>
                                                    <div className="btn btn-sm btn-outline btn-warning m-2">
                                                        <Link href={route('edit.news')} as="button" method="get" data={{id: data.id}} >
                                                            Edit
                                                        </Link>
                                                    </div>
                                                    <div className="btn btn-sm btn-outline btn-error m-2">
                                                        <Link href={route('delete.news')} as="button" method="post" data={{id: data.id}} >
                                                            Delete
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center">Tidak ada berita...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
