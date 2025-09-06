export const Row = ({
    children,
    style
}) => {
    return (

        <div className={`flex flex-col sm:flex-row gap-4 ${style}`}>
            {children}
        </div>
    );
}

export const Col = ({
    children,
    style
}) => {
    return (

        <div className={`flex-1 flex flex-col ${style}`}>
            {children}
        </div>
    );
}