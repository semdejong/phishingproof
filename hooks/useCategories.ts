import useSWR from "swr"

export default function useCategories(page: number, pageSize: number) {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR(`/api/listing/car/get?page=${page}&pageSize=${pageSize}`, () =>
    fetch("/api/categories/getAll?page=" + page + "&pageSize=" + pageSize, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
  )

  return {
    categories,
    error,
    isLoading,
  }
}
