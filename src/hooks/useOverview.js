import useSWR from "swr";
import { fetcher } from "../common/fetcher";

export default function useOverview() {
    const { data, isError } = useSWR('/overview', fetcher)

    return {
        data,
        isError,
        loading: !data && !isError
    }
}