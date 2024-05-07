import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import pWorkerModel from "../../../../api/pWorkers";

const UsersContext = createContext();

export const useUsers = () => useContext(UsersContext);

export const UsersProvider = ({ children, project_id }) => {

    const [users, setUsers] = useState();
    const [fetchUsers, setFetchUsers] = useState(false);

    const [showCreatePWorkerForm, setShowCreatePWorkerForm] = useState(false);

    const OpenCreatePWorkerForm = useCallback(() => {
        setShowCreatePWorkerForm(true);
    }, [showCreatePWorkerForm]);

    const CloseCreatePWorkerForm = useCallback(() => {
        setShowCreatePWorkerForm(false);
    }, [showCreatePWorkerForm]);

    const CreatePWorker = useCallback(async (pWorker) => {
        const response = await pWorkerModel.createPWorker(pWorker);
        return [response.status, response.data];
    });

    const UpdatePWorker = useCallback(async (pWorker) => {
        const response = await pWorkerModel.updatePWorker(pWorker);
        return [response.status, response.data];
    });

    const DeletePWorker = useCallback(async (pWorker) => {
        const response = await pWorkerModel.deletePWorker(pWorker);
        return [response.status, response.data];
    });

    // Switching value just to force state change
    const FetchUsers = useCallback(() => setFetchUsers(v => !v), [fetchUsers]);


    useEffect(() => {
        (async () => {
            const response = await pWorkerModel.getPWorkerByProjectId(project_id);
            if (response.status === 200) {
                setUsers(response.data);
            }
        })();
    }, [fetchUsers]);


    return (
        <UsersContext.Provider value={{
            users, FetchUsers, showCreatePWorkerForm, OpenCreatePWorkerForm, CloseCreatePWorkerForm, CreatePWorker, UpdatePWorker, DeletePWorker
        }}>{users && children}</UsersContext.Provider>
    )
}
