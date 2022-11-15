import useOverview from "../hooks/useOverview"

export default function Overview() {
    const { data, isError, loading } = useOverview()

    return <div>
        {
            data && data.data &&
            Object.keys(data.data).map((_key, _index) => <div
                key={_index}
                className="flex flex-col items-center text-slate-700 sm:m-5 lg:m-20 p-10 bg-white rounded shadow">
                <p style={{ fontSize: "15rem" }} className="font-bold m-0 p-0" >{data.data[_key]}</p>
                <p className="text-4xl font-semibold m-0 p-0">{_key}</p>
            </div>
            )

        }
    </div>
}