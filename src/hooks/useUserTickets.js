import useSWR from "swr";
import { fetcher } from "../common/fetcher";

export default function useUserTickets(userId) {
    const { data, isError } = useSWR(`/api/payments/${userId}`, fetcher)

    return {
        data,
        isError,
        loading: !data && !isError
    }
}