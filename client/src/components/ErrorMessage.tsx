type ErrorMessageType = {
    children: React.ReactNode
}

export function ErrorMessage({children}: ErrorMessageType) {
    return(
        <div className="text-xs text-red-500">
            {children}
        </div>
    )
}
