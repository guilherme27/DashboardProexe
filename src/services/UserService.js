import { api } from "../common/config/api";

export default function UserService() {

    const getUsers = () => {
        const loadUsers = () => {
            const test = api().get();
            return test;
        };

        if (!localStorage.getItem("users")){

            const updateUsers = async () => {
                try {
                    const { data } = await loadUsers();
                    let tempRow = []
                    for (let i = 0; i <= data.length - 1; i++) {
                        const row = { id: data[i]['id'], name: data[i]['name'], username: data[i]['username'], city: data[i]['address']['city'], email: data[i]['email'] };
                        tempRow.push(row);
                    }
                    localStorage.setItem('users', JSON.stringify(tempRow));
                } catch (e) {
                    console.error(e);
                }
            }
            updateUsers();
        }
        return (JSON.parse(localStorage.getItem("users") || "[]"));
    };
    
    const setUsers = (newlist) => {
        localStorage.setItem("users", JSON.stringify(newlist));

        return api().post("", newlist);
    };

    return { getUsers, setUsers }
}