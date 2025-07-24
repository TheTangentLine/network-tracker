interface UploadImagesProps {
    onHandleShow: () => void;
}

const UploadImages: React.FC<UploadImagesProps> = ({ onHandleShow }: UploadImagesProps) => {
    return (
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-lg flex justify-center items-center">
            <button className="px-10 py-10 bg-amber-50 cursor-pointer" onClick={onHandleShow}> hi </button>
        </div>
    )
}

export default UploadImages