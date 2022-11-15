import useSWR from "swr";
import { fetcher } from "../common/fetcher";

export default function useTickets() {
    const { data, isError } = useSWR(`/api/tickets`, fetcher)

    return {
        data,
        isError,
        loading: !data && !isError
    }
}