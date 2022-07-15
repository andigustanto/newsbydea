import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Navbar';
import NewsLists from '@/Components/Hompage/NewsLists';
import Pagination from '@/Components/Hompage/Pagination';
import { Inertia } from '@inertiajs/inertia';
import { property } from 'lodash';

export default function EditNews(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = () => {
        title.length > 0 ? title : props.news.title

        const data = {
            id: props.news.id,
            title : title.length > 0 ? title : props.news.title,
            description : description.length > 0 ? description : props.news.description,
            category : category.length > 0 ? category : props.news.category,
        };

        Inertia.post("/news/update", data);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    return (
        <div className='min-h-screen bg-slate-50'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            
            <div className='p-4 text-2xl'>Edit Berita</div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
    )
}