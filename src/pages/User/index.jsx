import './userStyle.scss'
import Account from '../../components/Account'
import AccountData from '../../data/accountData.json'
import { useNavigate } from 'react-router-dom'
import EditProfile from '../../components/EditProfile'

function User() {
    let jwt = localStorage.getItem("jwt")
    const navigate = useNavigate()
    if(!jwt) {
        navigate("/signIn")
    }
    return (
        <main className="main bg-dark">
            <EditProfile jwt={jwt} />
            <h2 className="sr-only">Accounts</h2>
            {AccountData.map((accounts) => (
                <Account
                key={accounts.id}
                title={accounts.title}
                amount={accounts.amount}
                description={accounts.description} />
            ))}
        </main>
    )
} 
export default User