import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import pWorkerModel from "../../../../api/pWorkers";

const UsersContext = createContext();

export const useUsers = () => useContext(UsersContext);

export const UsersProvider = ({ children, project_id }) => {

    const [users, setUsers] = useState();
    const [fetchUsers, setFetchUsers] = useState(false);

    const [currentId, setCurrentId] = useState(0);

    const [showCreatePWorkerForm, setShowCreatePWorkerForm] = useState(false);

    const OpenCreatePWorkerForm = useCallback((id) => {
        setCurrentId(id);
        setShowCreatePWorkerForm(true);
    }, [currentId, showCreatePWorkerForm]);

    const CloseCreatePWorkerForm = useCallback(() => {
        setCurrentId(0);
        setShowCreatePWorkerForm(false);
    }, [currentId, showCreatePWorkerForm]);

    const CreatePWorker = useCallback(async (pWorker) => {
        const response = await pWorkerModel.createPWorker(pWorker);
        return [response.status, response.data];
    });

    const UpdatePWorker = useCallback(async (pWorker) => {
        const response = await pWorkerModel.UpdatePWorker(pWorker);
        return [response.status, response.data];
    });

    const DeletePWorker = useCallback(async (pWorker) => {
        const response = await pWorkerModel.deletePWorker(pWorker);
        return [response.status, response.data];
    });

    // Switching value just to force state change
    const FecthUsers = useCallback(() => setFetchUsers(v => !v), [fetchUsers]);


    useEffect(() => {
        (async () => {
            const response = await pWorkerModel.getPWorkerByProjectId(project_id);
            if (response.status === 200) {
                setUsers(response.data);
            }
            else {
                // TODO no fing clue
            }
        })();
    }, [fetchUsers]);


    return (
        <UsersContext.Provider value={{
            users, FecthUsers, showCreatePWorkerForm, OpenCreatePWorkerForm, CloseCreatePWorkerForm, CreatePWorker, UpdatePWorker, DeletePWorker
        }}>{users && children}</UsersContext.Provider>
    )
}
