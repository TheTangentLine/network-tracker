const PasswordEditor: React.FC = () => {
    return (
        <div className="flex flex-col">
            <label>Confirm old password</label>
            <input type='password' className="border-2" />

            <label>Enter new password</label>
            <input type='password' className="border-2" />

            <label>Confirm new password</label>
            <input type='password' className="border-2" />
        </div>
    )
}

export default PasswordEditor;