import React, {useEffect, useState} from "react";
import {getUsers, getOrganizations} from "./api";

function App() {
    const [loading, setLoading] = useState(true);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [users, setUsers] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    useEffect(() => {
        getUsers()
            .then((u) => setUsers(u))
            .then(() => getOrganizations())
            .then((o) => setOrganizations(o))
            .then(() => setLoading(false));
    }, []);


    if (loading) {
        return "Loading...";
    }
    const getAllUsers = () => users.map(u => {
        const org = organizations.find(o => o.id === u.organizaiton).name;
        return (
            <div className="user-list-item" key={u.id}>
                <div>name: {u.name}</div>
                <div onClick={() => setSelectedOrg(org)}>org: {org}</div>
            </div>
        )
    });
    const getUserOrg = () => users.filter(u => u.organizaiton === organizations.find(o => o.name === selectedOrg).id)
        .map(u => (
            <div className="user-list-item" key={u.id}>
                <div>name: {u.name}</div>
                <div>org: {selectedOrg}</div>
            </div>
        ));

    const usersList = selectedOrg ? getUserOrg() : getAllUsers()


    return (
        <div>
            {selectedOrg && (
                <button onClick={() => setSelectedOrg(null)}>
                    reset selected org
                </button>
            )}
            <div className="user-list">{usersList}</div>
        </div>
    );
}

export default App;
