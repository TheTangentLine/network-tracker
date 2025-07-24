const DetailsEditor: React.FC = () => {
    return (
        <div className="flex flex-col mt-10">
            <label>Username</label>
            <div>
                <input type="text" className="border-2" />
                <button>Edit</button>
            </div>

            <label>Phone</label>
            <div>
                <input type="text" className="border-2" />
                <button>Edit</button>
            </div>

            <label>Email</label>
            <div>
                <input type="text" className="border-2" />
                <button>Edit</button>
            </div>

        </div>
    )
}

export default DetailsEditor;