export function Square({ children, updateBoard, index, darkMode}) {

    const handleClick = () => {
        updateBoard(index)
    }

    return (
        <div onClick={handleClick} className="w-20 h-20 bg-white text-5xl font-bold dark:bg-stone-950 dark:text-white dark:hover:bg-stone-900 transition-all duration-100 ease-in-out rounded content-center">
            {children}
        </div>
    )
}