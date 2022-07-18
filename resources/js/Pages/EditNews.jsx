import React, { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Navbar from "@/Components/Navbar";
import NewsLists from "@/Components/Hompage/NewsLists";
import Pagination from "@/Components/Hompage/Pagination";
import { Inertia } from "@inertiajs/inertia";
import { property } from "lodash";
import Authenticated from "@/Layouts/Authenticated";

export default function EditNews(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = () => {
        title.length > 0 ? title : props.news.title;

        const data = {
            id: props.news.id,
            title: title.length > 0 ? title : props.news.title,
            description:
                description.length > 0 ? description : props.news.description,
            category: category.length > 0 ? category : props.news.category,
        };

        Inertia.post("/admin-page/news/update", data);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit News
                </h2>
            }
        >
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <input
                                type="text"
                                placeholder="Judul"
                                className="m-2 input input-bordered w-full"
                                onChange={(title) =>
                                    setTitle(title.target.value)
                                }
                                defaultValue={props.news.title}
                            />
                            <input
                                type="text"
                                placeholder="Deskripsi"
                                className="m-2 input input-bordered w-full"
                                onChange={(description) =>
                                    setDescription(description.target.value)
                                }
                                defaultValue={props.news.description}
                            />
                            <input
                                type="text"
                                placeholder="Kategori"
                                className="m-2 input input-bordered w-full"
                                onChange={(category) =>
                                    setCategory(category.target.value)
                                }
                                defaultValue={props.news.category}
                            />
                            <Link href={route('read.news')}
                                className="btn btn-warning m-2"
                                as="button"
                            >
                                Cancel
                            </Link>
                            <button
                                className="btn btn-primary m-2"
                                onClick={() => handleSubmit()}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
