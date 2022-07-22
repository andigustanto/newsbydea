import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, Head } from "@inertiajs/inertia-react";
import { NewsCreate } from "@/Components/Dashboard/News/NewsCreate";

const News = ({ props }) => {
    console.log("props", props);
    useEffect(() => {
        if (!props.news) {
            Inertia.get("/admin-page/news");
        }
        return;
    }, []);

    return (
        <div className="py-2 w-full">
            <NewsCreate props={props} />

            <div className="overflow-x-auto max-w-7xl mx-auto sm:px-6 lg:px-8">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Desc</th>
                            <th>Author</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.news && props.news.data.length > 0 ? (
                            props.news.data.map((data, i) => {
                                return (
                                    <tr className="hover" key={i}>
                                        <th>{i + 1}</th>
                                        <td>
                                            {data.title.substring(0, 30) +
                                                "..."}
                                        </td>
                                        <td>
                                            {!data.img && (
                                                <img
                                                    src={
                                                        props.ziggy.url +
                                                        "/storage/" +
                                                        data.image
                                                    }
                                                    alt=""
                                                    width="50px"
                                                />
                                            )}
                                        </td>
                                        <td>
                                            {data.description.substring(0, 20) +
                                                "..."}
                                        </td>
                                        <td>
                                            <div className="badge badge-inline">
                                                {data.users.name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="btn btn-sm btn-outline btn-warning m-2">
                                                <Link
                                                    href={route("edit.news")}
                                                    as="button"
                                                    method="get"
                                                    data={{
                                                        id: data.id,
                                                    }}
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                            <div className="btn btn-sm btn-outline btn-error m-2">
                                                <Link
                                                    href={route("delete.news")}
                                                    as="button"
                                                    method="post"
                                                    data={{
                                                        id: data.id,
                                                    }}
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    Tidak ada berita...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default News;
