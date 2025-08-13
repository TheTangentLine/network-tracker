const Loading = () => {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center font-montserrat">
            
            <div className="w-16 h-16 border-6 border-gray-200 border-t-emerald-600 rounded-full animate-spin"></div>    

            <div className="mt-6 text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading...</h2>
                <p className="text-sm text-gray-500">Please wait while we prepare your experience</p>
            </div>
            
        </div>
    )
}

export default Loading;