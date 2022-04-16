import UserService from "./UserService"

export default function UpdateService() {

    const getUsers = () => {

        if (!localStorage.getItem("users")){
            const teste = UserService().loadUsers();
            console.log(teste);

            const updateUsers = async () => {
                try {
                    const { data } = await UserService().loadUsers();
                    localStorage.setItem('users', JSON.stringify(data));
                } catch (e) {
                    console.error(e);
                }
            }
            updateUsers();
        }
        return (JSON.parse(localStorage.getItem("users") || "[]"))
    };
    
    const setUsers = (newlist) => {
        localStorage.setItem("users", JSON.stringify(newlist));
    };

    return { getUsers, setUsers }
}