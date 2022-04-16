import { api } from "../common/config/api";

export default function UserService() {

    const loadUsers = () => {
        const test = api().get();
        return test;
    };

    return { loadUsers }
}