import NavBar from "../Components/Navbar";

export default function Dashboard() {
    const userId = localStorage.getItem('idUser');
    const utilisateur_id = localStorage.getItem('utilisateur_id');
    return (
        <div>
            <NavBar />
            <h1>Dashboard</h1>
            <p>Welcome {userId} and {utilisateur_id}</p>
        </div>
    );
}