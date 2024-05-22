import { useCallback, createContext, useContext, useEffect, useState } from "react";
import TasksModel from "../../../../api/tasks";

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children, project_id }) => {

    const [tasks, setTasks] = useState();
    const [activeTask, setActiveTask] = useState();
    const [fetchTasks, setFetchTasks] = useState();
    const FetchTasks = useCallback(() => setFetchTasks(v => !v), [fetchTasks]);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showUpdateStatusForm, setShowUpdateStatusForm] = useState(false);
    const [showViewForm, setShowViewForm] = useState(false);

    const OpenCreateForm = useCallback(() => {
        setShowCreateForm(true);
    });
    const CloseCreateForm = useCallback(() => {
        setShowCreateForm(false);
    })

    const OpenUpdateForm = useCallback((task) => {
        setActiveTask(task);
        setShowUpdateForm(true);
    });

    const CloseUpdateForm = useCallback(() => {
        setActiveTask();
        setShowUpdateForm(false);
    });

    const OpenUpdateStatusForm = useCallback((task) => {
        setActiveTask(task);
        setShowUpdateStatusForm(true);
    })

    const CloseUpdateStatusForm = useCallback(() => {
        setActiveTask();
        setShowUpdateStatusForm(false);
    });

    const OpenViewForm = useCallback((task) => {
        setActiveTask(task);
        setShowViewForm(true);
    })

    const CloseViewForm = useCallback(() => {
        setActiveTask();
        setShowViewForm(false);
    })

    const CreateTask = async (data) => {
        const task = { ...data, project_id };
        const response = await TasksModel.createTask(task);
        return [response.status, response.data];
    };

    const UpdateTask = async (data) => {
        const task = { ...data, project_id };
        const response = await TasksModel.updateTask(task);
        return [response.status, response.data];
    };

    const UpdateTaskStatus = async (task) => {
        const response = await TasksModel.updateTaskStatus(task);
        return [response.status, response.data];
    };

    const DeleteTask = async (id) => {
        const response = await TasksModel.deleteTask(id);
        return [response.status, response.data];
    };

    useEffect(() => {
        (async () => {
            const response = await TasksModel.getProjectTasks(project_id);
            if (response.status === 200) {
                setTasks(response.data);
            }
        })();

    }, [fetchTasks]);


    return (
        <TasksContext.Provider value={{
            tasks, activeTask, fetchTasks, FetchTasks,
            CreateTask, showCreateForm, OpenCreateForm, CloseCreateForm,
            UpdateTask, showUpdateForm, OpenUpdateForm, CloseUpdateForm,
            UpdateTaskStatus, showUpdateStatusForm, OpenUpdateStatusForm, CloseUpdateStatusForm,
            showViewForm, OpenViewForm, CloseViewForm,
            DeleteTask
        }}>{tasks && children}</TasksContext.Provider>
    )
}
