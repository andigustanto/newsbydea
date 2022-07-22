import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import { AlertSuccess } from "@/Components/Dashboard/AlertSuccess";
import { AlertError } from "@/Components/Dashboard/AlertError";

export const NewsCreate = ({ props }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [isCreate, setIsCreate] = useState(false);
    
    const handleSubmit = () => {
        const data = {
            title,
            description,
            category,
            image
        };

        Inertia.post("/admin-page/news", data);

        if (title !== "" && description !== "" && category !== "") {
            setTitle("");
            setDescription("");
            setCategory("");
            setImage(null)
        }
    };

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div
                    className={
                        "p-2 bg-white border-b border-gray-200 " +
                        (isCreate && "hidden")
                    }
                >
                    <button
                        className="btn btn-sm btn-primary m-2"
                        onClick={() => setIsCreate(!isCreate)}
                    >
                        Add News
                    </button>
                </div>

                <div
                    className={
                        "p-2 bg-white border-b border-gray-200 " +
                        (!isCreate && "hidden")
                    }
                >
                    {props && props.flash.message && (
                        <AlertSuccess message={props.flash.message} />
                    )}

                    {props && props.errors && (
                        <AlertError message={props.errors} />
                    )}

                    <input
                        type="text"
                        placeholder="Judul"
                        className="m-2 input input-bordered w-full"
                        onChange={(title) => setTitle(title.target.value)}
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

                    <input
                        type="file"
                        className="m2 input input-bordered w-full"
                        name="image"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <button
                        className="btn btn-warning m-2"
                        onClick={() => setIsCreate(!isCreate)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary m-2"
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};
