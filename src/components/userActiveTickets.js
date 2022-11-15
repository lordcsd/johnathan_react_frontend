import useUserTickets from "../hooks/useUserTickets"

export default function UserActiveTickets() {

    const { data, isError, loading } = useUserTickets()

    console.log(data)
    
    return <div>User manage tickets</div>
}