import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import api from "../Services/api";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get(`/tasks/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTasks(response.data);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
        };

        fetchTasks();
    }, [id]);

    useEffect(() => {
        const socket = io("http://localhost:5000");
        socket.emit("join_project", id);

        socket.on("task_update", (task) => {
            setTasks((prevTasks) => [...prevTasks, task]);
        });

        return () => {
            socket.disconnect();
        };
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await api.post(
                "/tasks",
                { title, description, projectId: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTitle("");
            setDescription("");
        } catch (error) {
            console.error("Failed to create task:", error);
        }
    };

    return (
        <div>
            <h1>Tasks for Project {id}</h1>
            <ul>
                {tasks.map((task: any) => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
};

export default TaskList;
