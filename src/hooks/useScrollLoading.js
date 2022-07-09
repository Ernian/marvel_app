const useScrollLoading = (observer, loading, callback, lastRow, isEnd) => {
    return function () {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(
            (entries, observer) => {
                if (entries[0].isIntersecting && !loading) {
                    callback()
                }
                if (isEnd) {
                    observer.unobserve(entries[0].target)
                }
            },
            {
                threshold: 1,
            }
        )
        observer.current.observe(lastRow.current)
    }
}

export default useScrollLoading