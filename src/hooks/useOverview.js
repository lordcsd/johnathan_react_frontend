import useSWR from "swr";
import { fetcher } from "../common/fetcher";

export default function useOverview() {
    const { data, isError } = useSWR('/api/overview', fetcher)

    return {
        data,
        isError,
        loading: !data && !isError
    }
}