import { useEffect, useState } from "react";
import api from "../Services/api";
import Link from "next/link";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/projects", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProjects(response.data);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div>
            <h1>Your Projects</h1>
            <ul>
                {projects.map((project: any) => (
                    <li key={project.id}>
                        <Link href={`/project/${project.id}`}>{project.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
