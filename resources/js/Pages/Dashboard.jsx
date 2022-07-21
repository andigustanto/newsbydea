import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Link, Head } from "@inertiajs/inertia-react";
import SideBar from "@/Components/Dashboard/Sidebar";
import { Inertia } from "@inertiajs/inertia";
import News from "@/Pages/Dashboard/News"

export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    { props.title }
                </h2>
            }
        >
            <Head title={props.title} />
            <div className="flex">
                <SideBar />

                <News props={props} />
            </div>
        </Authenticated>
    );
}
